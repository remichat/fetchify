class PlaylistsManagementService
  def initialize(user)
    user.refresh_token_from_spotify
    user.reload
    @user = user
    @spotify_service = SpotifyService.new(@user)
  end

  def update_user_playlists
    playlists = @spotify_service.fetch_user_playlists
    update_playlists(playlists)
  end

  def update_all_songs # not used atm
    @user.playlists.all.each do |playlist|
      songs = @spotify_service.fetch_songs_from_playlist(playlist.spotify_id)
      if playlist.songs.size != songs.reject { |song| song["track"].nil? }.size
        update_playlist_songs_from_response(songs, playlist)
      end
    end
  end

  def update_playlist_songs(playlist)
    songs = @spotify_service.fetch_songs_from_playlist(playlist.spotify_id)
    if playlist.songs.size != songs.reject { |song| song["track"].nil? }.size
      update_playlist_songs_from_response(songs, playlist)
    end
    update_playlist_songs_features(playlist)
  end

  private

  def update_playlists(playlists)
    playlists.each do |playlist_element|
      new_playlist = Playlist.find_or_create_by(spotify_id: playlist_element["id"]) do |playlist|
        playlist.name = playlist_element["name"]
      end
      UserPlaylist.find_or_create_by(user: @user, playlist: new_playlist)

      new_playlist.cover_url = playlist_element["images"][1]["url"] if playlist_element["images"][1]
      new_playlist.number_of_tracks = playlist_element["tracks"]["total"]
      new_playlist.save
    end
  end

  def update_playlist_songs_from_response(songs, playlist)
    songs.each do |song_element|
      song_element = song_element["track"]
      next if song_element.nil?

      song_from_db = Song.find_or_create_by(spotify_id: song_element["id"]) do |song|
        album = Album.create_with(name: song_element["album"]["name"])
                     .find_or_create_by(spotify_id: song_element["album"]["id"])
        song.name = song_element["name"]
        song.album = album
        song.preview_url = song_element["preview_url"]

        song_element["artists"].each do |artist_element|
          artist = Artist.create_with(name: artist_element["name"])
                         .find_or_create_by(spotify_id: artist_element["id"])
          SongArtist.create(artist: artist, song: song)
        end
      end

      PlaylistSong.find_or_create_by(song: song_from_db, playlist: playlist)
    end
  end

  def update_playlist_songs_features(playlist)
    playlist.reload
    song_ids = playlist.songs.map(&:spotify_id)
    features = @spotify_service.fetch_tracks_features(song_ids)
    features.each do |feature|
      next if feature.nil?

      song = Song.find_by(spotify_id: feature['id'])
      song.tempo = feature['tempo']
      song.key = feature['key']
      song.energy = feature['energy']
      song.speechiness = feature['speechiness']
      song.instrumentalness = feature['instrumentalness']
      song.danceability = feature['danceability']
      song.duration_s = feature['duration_ms']/1000
      song.save
    end
  end
end
