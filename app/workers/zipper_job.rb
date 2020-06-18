class ZipperJob < ApplicationJob
  queue_as :default

  def perform(download_id)
    download = Download.find(download_id)

    @tmp_dir = "./public/tmp/#{download.id}"
    @zipfile_path = "#{@tmp_dir}/#{download.id}.zip"

    return if Dir.exist?(@tmp_dir)

    Dir.mkdir(@tmp_dir)

    song_downloads = download.song_downloads.where(status: SongDownload::STATUSES[:success])
    songs = song_downloads.map(&:song)
    create_zip_file(songs)

    songs.each { |song| song.file.purge }
    song_downloads.each { |song_download| song_download.update(status: SongDownload::STATUSES[:deleted]) }
    
    download.file.attach(io: File.open(@zipfile_path), filename: "#{download.name}.zip")
    download.update!(status: Download::STATUSES[:ready])

    FileUtils.remove_dir(@tmp_dir)
  end

  private

  def create_zip_file(songs)
    require 'zip'
    Zip::File.open(@zipfile_path, Zip::File::CREATE) do |zipfile|
      songs.each do |song|

        file_path = "#{@tmp_dir}/#{song.file.blob.filename}"
        File.open(file_path, 'wb') do |file|
          file.write(song.file.download)
        end

        filename = "#{song.artists_string} - #{song.name}.mp3"

        zipfile.add(filename, file_path)
      end
    end
  end
end
