class Album < ApplicationRecord
  validates :name, presence: true
  validates :spotify_id, uniqueness: true

  has_many :songs, dependent: :destroy
  has_many :artists, through: :songs
end
