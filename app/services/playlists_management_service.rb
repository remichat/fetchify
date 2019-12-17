class PlaylistsManagementService
  def initialize(user)
    @user = user
  end

  def update_user_playlists
    @user.refresh_token_from_spotify
    spotify_service = SpotifyService.new(@user)
    playlists = spotify_service.user_playlists
    update_playlists(playlists)
  end

  def update_all_songs # not used atm
    @user.refresh_token_from_spotify
    spotify_service = SpotifyService.new(@user)
    @user.playlists.all.each do |playlist|
      songs = spotify_service.songs_from_playlist(playlist.spotify_id)
      if playlist.songs.size != songs.reject { |song| song["track"].nil? }.size
        update_playlist_songs_from_response(songs, playlist)
      end
    end
  end

  def update_playlist_songs(playlist)
    @user.refresh_token_from_spotify
    spotify_service = SpotifyService.new(@user)
    songs = spotify_service.songs_from_playlist(playlist.spotify_id)
    if playlist.songs.size != songs.reject { |song| song["track"].nil? }.size
      update_playlist_songs_from_response(songs, playlist)
    end
  end

  private

  def update_playlists(playlists)
    playlists.each do |playlist_element|
      Playlist.find_or_create_by(spotify_id: playlist_element["id"]) do |playlist|
        playlist.name = playlist_element["name"]
        UserPlaylist.create(user: @user, playlist: playlist)
      end
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
end
