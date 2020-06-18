desc "get_genres"
task :fill_genres, [:is_real_run] do |task, args|
  user = User.first
  user.refresh_token_from_spotify
  user.reload
  spotify_service = SpotifyService.new(user)
  p user

  base_url = 'https://api.spotify.com/v1/artists/'

  total = Artist.count
  count = 0
  Artist.all.each do |artist|
    count += 1
    puts "#{count} / #{total}"
    next if artist.genres.present?
    genres = spotify_service.fetch_genres_from_url("https://api.spotify.com/v1/artists/#{artist.spotify_id}")

    genres.each do |genre_name|
      genre = Genre.find_or_create_by(name: genre_name)
      ArtistGenre.create(genre: genre, artist: artist)
    end
  end

  puts 'done'
end