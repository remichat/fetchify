class DownloaderJob < ApplicationJob
  queue_as :default

  def perform(song_id)
    song = Song.find(song_id)
    song.file_location = 'it works'
    song.save
  end
end
