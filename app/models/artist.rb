class Artist < ApplicationRecord
  validates :name, presence: true
  validates :spotify_id, uniqueness: true

  has_many :song_artists
  has_many :songs, through: :song_artists
  has_many :albums, through: :songs
  has_many :artist_genres
  has_many :genres, through: :artist_genres
end
