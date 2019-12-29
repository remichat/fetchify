class ZipperJob < ApplicationJob
  queue_as :default

  def perform(download_id)
    download = Download.find(download_id)

    @zipfile_name = "./public/downloads/#{download.id}.zip"
    @tmp_path = "./public/tmp_songs/#{download.id}"

    return if Dir.exist?(@tmp_path)

    Dir.mkdir(@tmp_path)

    downloaded_songs = download.song_downloads.where(status: SongDownload::STATUSES[:success]).map(&:song)
    create_zip_file(downloaded_songs)

    FileUtils.remove_dir(@tmp_path)

    download.file.attach(io: File.open(@zipfile_name), filename: "#{download.id}.zip")
    download.public_location = Rails.application.routes.url_helpers.rails_blob_path(download.file, only_path: true)
    download.status = Download::STATUSES[:ready]
    download.save
  end

  private

  def create_zip_file(songs)
    require 'zip'
    Zip::File.open(@zipfile_name, Zip::File::CREATE) do |zipfile|
      songs.each do |song|

        file_path = "#{@tmp_path}/#{song.file.blob.filename}"
        File.open(file_path, 'wb') do |file|
          file.write(song.file.download)
        end

        zipfile.add(song.file.blob.filename, file_path)
      end
    end
  end
end
