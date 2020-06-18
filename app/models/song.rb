class Song < ApplicationRecord
  has_one_attached :file

  validates :name, presence: true
  validates :spotify_id, uniqueness: true, presence: true

  belongs_to :album
  has_many :playlist_songs
  has_many :playlists, through: :playlist_songs
  has_many :user_playlists, through: :playlists
  has_many :users, through: :user_playlists
  has_many :song_artists
  has_many :artists, through: :song_artists
  has_many :song_downloads
  has_many :downloads, through: :song_downloads
  has_many :genres, through: :artists

  def details_hash
    {
      name: name,
      artists: artists_string,
      album: album.name,
      preview_url: preview_url
    }
  end

  def genres_string(first_x = 6)
    return nil if first_x.nil? || genres.nil?
    
    genres.first(first_x).map{ |genre| genre.name.capitalize }.join(', ')
  end

  def artists_string
    artists.map(&:name).join(', ') if artists.present?
  end
end
