class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_download_id)
    song_download = SongDownload.includes({ song: [:artists, :album, :genres] }, :download).find(song_download_id)
    song = song_download.song
    download = song_download.download

    download_url = download_url_from_query("#{song.artists.first.name} #{song.name}", song.duration_s)

    if download_url.nil?
      song_download.update(status: SongDownload::STATUSES[:failed])
    else
      attach_file(song, download, download_url)
      song_download.update(status: SongDownload::STATUSES[:success])
    end
    ZipperJob.perform_later(download.id) if all_downloads_finished?(download)
  end

  private

  def download_url_from_query(query, target_duration)
    body = {
      q: query.gsub(" ", "+"),
      page: '0'
    }
    url = ENV['DOWNLOAD_URL']
    response_call = RestClient.post(url, body)
    response_call = JSON.parse(response_call)["response"]
    pos_start = response_call.index(/\(/)
    hashed_resp = JSON.parse(response_call[pos_start + 1..-3])
    hashed_resp&.dig("response")&.second&.dig("url")
    array_songs = hashed_resp&.dig("response")
    return if array_songs.nil?

    array_songs[1..-1]&.find{ |song| (song["duration"] - 5..song["duration"] + 5).include?(target_duration) }
  end

  def all_downloads_finished?(download)
    !download.song_downloads.where(status: SongDownload::STATUSES[:ongoing]).any?
  end

  def attach_file(song, download, download_url)
    require 'open-uri'
    require "mp3info"

    file_path = "public/tmp_songs/#{song.id}.mp3"

    open(file_path, 'wb') do |file|
      file << URI.parse(download_url).open.read
    end

    comment_parts = [download.custom_comment, song.genres_string(download.first_x_genres_as_comment)].reject(&:nil?)
    Mp3Info.open(file_path) do |file|
      tag = file.tag
      tag.artist = song.artists_string
      tag.title = song.name
      tag.album = song.album.name
      file.tag2.COMM = comment_parts.join(' | ')
    end

    file_dl = File.open(file_path)

    song.file.attach(
      io: file_dl,
      filename: "#{song.name}.mp3",
      content_type: "audio/mpeg")
    
    File.delete(file_path) if File.exist?(file_path)
  end
end
