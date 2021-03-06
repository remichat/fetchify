class Artist < ApplicationRecord
  validates :name, presence: true
  validates :spotify_id, uniqueness: true

  has_many :song_artists
  has_many :songs, through: :song_artists
  has_many :albums, through: :songs
  has_many :artist_genres
  has_many :genres, through: :artist_genres

  def self.please_delete_this_when_you_see_it
    user = User.first
    user.refresh_token_from_spotify
    user.reload
    spotify_service = SpotifyService.new(user)
    p user
  
    base_url = 'https://api.spotify.com/v1/artists/'
  
    artists_ids = Artist.all.reject{ |artist| artist.genres.present? }
    
    total = artists_ids.size
    count = 0
    artists_arrays = artists_ids.each_slice(50).to_a
  
    artists_arrays.each do |artists|
      string = artists.map(&:spotify_id).join(',')
      url = "https://api.spotify.com/v1/artists?ids=#{string}"
      p url
      response = spotify_service.request_spotify(url)
      sp_artists = response["artists"]
  
      artists.each do |artist|
        count += 1
        puts "#{count} / #{total}"
  
        sp_artist = sp_artists.find{ |artist_json| artist_json["id"] == artist.spotify_id }
        next if sp_artist.nil?
  
        genres = sp_artist["genres"]
        genres.each do |genre_name|
          genre = Genre.find_or_create_by(name: genre_name)
          ArtistGenre.create(genre: genre, artist: artist)
        end
      end
  
    end
    puts 'done'
  end
end
