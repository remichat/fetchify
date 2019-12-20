class Download < ApplicationRecord
  belongs_to :user
  has_many :song_downloads
  has_many :songs, through: :song_downloads

end
