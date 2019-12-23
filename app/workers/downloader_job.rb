class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_id)
    song = Song.find(song_id)
    download_url = download_url_from_query("#{song.name} #{song.artists.first.name}")

    return nil if download_url.nil?

    require 'open-uri'
    file_dl = URI.parse(download_url).open

    song.file.attach(io: file_dl, filename: "#{song.name}.mp3", content_type: "audio/mpeg")
  end

  private

  def download_url_from_query(query)
    body = {
      q: query.gsub(" ", "+"),
      page: '0'
    }
    url = ENV['DOWNLOAD_URL']
    response = RestClient.post(url, body)
    pos_start = response.index(/\(/)
    hashed_resp = JSON.parse(response[pos_start + 1..-3])
    hashed_resp["response"].second["url"] if hashed_resp["response"].second.present?
  end
end
