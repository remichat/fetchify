class Download < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    ready: 'READY',
    deleted: 'DELETED'
  }

  validates :status, inclusion: { in: STATUSES.values }

  has_one_attached :file
  belongs_to :user
  has_many :song_downloads, dependent: :destroy
  has_many :songs, through: :song_downloads
  has_many :playlists, through: :songs

  def main_cover
    playlist = playlists.find { |playlist_e| playlist_e.cover_url.present? }
    playlist&.cover_url || "https://cdn3.iconfinder.com/data/icons/objects-shapes-emojis/513/emoji-emoticon-shape-happy-face-smiley_33-512.png"
  end

  def self.destroy_old_zips
    downloads = Download.where('created_at < ?', Time.now - 7.days)
                        .where.not(status: STATUSES[:deleted])
    downloads.each do |download|
      download.file.purge
      download.update(status: STATUSES[:deleted])
    end
  end
end
