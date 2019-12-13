class Song < ApplicationRecord
  validates :name, presence: true

  belongs_to :album
  has_many :playlist_songs
  has_many :playlists, through: :playlist_songs
  has_many :user_playlists, through: :playlists
  has_many :users, through: :user_playlists
  has_many :song_artists
  has_many :artists, through: :song_artists
end
