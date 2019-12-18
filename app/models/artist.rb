class Artist < ApplicationRecord
  validates :name, presence: true
  validates :spotify_id, uniqueness: true

  has_many :song_artists
  has_many :songs, through: :song_artists
  has_many :albums, through: :songs
end
