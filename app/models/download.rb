class Download < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    ready: 'READY'
  }

  validates :status, inclusion: { in: STATUSES.values }

  has_one_attached :file
  belongs_to :user
  has_many :song_downloads
  has_many :songs, through: :song_downloads
end
