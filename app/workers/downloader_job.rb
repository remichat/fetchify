class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_download_id)
    song_download = SongDownload.find(song_download_id)
    song = song_download.song
    download = song_download.download

    download_url = download_url_from_query("#{song.name} #{song.artists.first.name}")

    if download_url.nil?
      song_download.update(status: SongDownload::STATUSES[:failed])
    else
      attach_file(song, download_url)
      song_download.update(status: SongDownload::STATUSES[:success])
    end
    ZipperJob.perform_later(download.id) if all_downloads_finished?(download)
  end

  private

  def download_url_from_query(query)
    body = {
      q: query.gsub(" ", "+"),
      page: '0'
    }
    url = ENV['DOWNLOAD_URL']
    response_call = RestClient.post(url, body)
    response_call = JSON.parse(response_call)["response"]
    pos_start = response_call.index(/\(/)
    hashed_resp = JSON.parse(response_call[pos_start + 1..-3])
    hashed_resp["response"].second["url"] if hashed_resp["response"].second.present?
  end

  def all_downloads_finished?(download)
    download.song_downloads.where(status: SongDownload::STATUSES[:ongoing]).empty?
  end

  def attach_file(song, download_url)
    require 'open-uri'
    file_dl = URI.parse(download_url).open

    song.file.attach(io: file_dl, filename: "#{song.name}.mp3", content_type: "audio/mpeg")
  end
end
