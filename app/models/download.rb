class Download < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    ready: 'READY'
  }

  validates :status, inclusion: { in: STATUSES.values }

  has_one_attached :file
  belongs_to :user
  has_many :song_downloads, dependent: :destroy
  has_many :songs, through: :song_downloads
  has_many :playlists, through: :songs

  def main_cover
    playlist = playlists.select { |playlist_e| playlist_e.cover_url.present? }.first
    playlist.nil? ? "https://cdn3.iconfinder.com/data/icons/objects-shapes-emojis/513/emoji-emoticon-shape-happy-face-smiley_33-512.png" : playlist.cover_url
  end
end
