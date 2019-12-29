class Download < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    ready: 'READY'
  }

  validates :status, inclusion: { in: STATUSES.values }

  belongs_to :user
  has_many :song_downloads
  has_many :songs, through: :song_downloads
end
