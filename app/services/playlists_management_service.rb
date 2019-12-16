class PlaylistsManagementService
  def initialize(user)
    @user = user
  end

  def update_user_songs
    @user.refresh_token_from_spotify

    playlists_response = SpotifyService.user_playlists(@user.nickname, @user.access_token)
    update_playlists(playlists_response)

    @user.playlists.all.each do |playlist|
      songs_response = SpotifyService.songs_from_playlist(playlist.spotify_id, @user.access_token)
      update_songs(songs_response)
    end
  end

  private

  def update_playlists(playlists_response)
    playlists = playlists_response["items"]
    playlists.each do |playlist_element|
      Playlist.find_or_create_by(spotify_id: playlist_element["id"]) do |playlist|
        playlist.name = playlist_element["name"]
        UserPlaylist.create(user: @user, playlist: playlist)
      end
    end
  end

  def update_songs(songs_response)
    songs_response["items"].each do |song_element|
      song_element = song_element["track"]
      next if song_element.nil?

      Song.find_or_create_by(spotify_id: song_element["id"]) do |song|
        album = Album.create_with(name: song_element["album"]["name"])
                     .find_or_create_by(spotify_id: song_element["album"]["id"])
        song.name = song_element["name"]
        song.album = album
        song.preview_url = song_element["preview_url"]

        PlaylistSong.create(song: song, playlist: playlist)

        song_element["artists"].each do |artist_element|
          artist = Artist.create_with(name: artist_element["name"])
                         .find_or_create_by(spotify_id: artist_element["id"])
          SongArtist.create(artist: artist, song: song)
        end
      end
    end
  end
end
