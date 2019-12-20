class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_id)
    song = Song.find(song_id)
    download_location = download_url("#{song.name} #{song.artists.first.name}")

    require 'open-uri'
    file_dl = URI.parse(download_location).open.read
    File.open("./public/songs/#{song.id}.mp3", 'wb') do |file|
      file << file_dl
    end

    song.file.attach(io: File.open("./public/songs/#{song.id}.mp3"), filename: "#{song.name}.mp3")
  end

  private

  def download_url(query)
    body = {
      q: query.gsub(" ", "+"),
      page: '0'
    }
    url = 'https://myfreemp3c.com/api/search.php?callback=jQuery213040082379651486266_1576866073576'
    response = RestClient.post(url, body)
    pos_start = response.index(/\(/)
    hashed_resp = JSON.parse(response[pos_start + 1..-3])
    hashed_resp["response"].second["url"]
  end
end
