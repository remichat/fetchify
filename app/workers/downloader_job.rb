class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_download_id)
    song_download = SongDownload.includes({ song: [:artists, :album, :genres] }, :download).find(song_download_id)
    song = song_download.song
    download = song_download.download

    search_query = "#{song.artists.first.name} #{song.name}"
    file_path = YoutubeDownloader.new.download_audio(search_query, song.duration_s, song.id)

    if file_path
      set_file_metadata(song, download, file_path)
      attach_file(song, file_path)
      song_download.update(status: SongDownload::STATUSES[:success])
    else
      song_download.update(status: SongDownload::STATUSES[:failed])
    end

    ZipperJob.perform_later(download.id) if all_downloads_finished?(download)
  end

  private

  def all_downloads_finished?(download)
    !download.song_downloads.where(status: SongDownload::STATUSES[:ongoing]).any?
  end

  def set_file_metadata(song, download, file_path)
    comment_parts = [download.custom_comment, song.genres_string(download.first_x_genres_as_comment)].reject(&:nil?)
    Mp3Info.open(file_path) do |file|
      tag = file.tag
      tag.artist = song.artists_string
      tag.title = song.name
      tag.album = song.album.name
      file.tag2.COMM = comment_parts.join(' | ')
    end
  end

  def attach_file(song, file_path)
    file_dl = File.open(file_path)

    song.file.attach(
      io: file_dl,
      filename: "#{song.name}.mp3",
      content_type: "audio/mpeg")

    File.delete(file_path) if File.exist?(file_path)
  end
end
