class Api::V1::CurrentUser::SongsController < ApplicationController
  def index
    playlist = Playlist.find(params[:playlist_id])
    playlist_service = PlaylistsManagementService.new(current_user)
    playlist_service.update_playlist_songs(playlist)
    playlist.reload

    results = playlist.songs.map do |song|
      album = song.album.name if song.album.present?
      artists = song.artists.map(&:name).join(', ') if song.artists.present?
      {
        id: song.id,
        name: song.name,
        album: album,
        artists: artists,
        tempo: song.tempo,
        key: song.key,
        energy: song.energy,
        speechiness: song.speechiness,
        instrumentalness: song.instrumentalness,
        danceability: song.danceability,
        duration_s: song.duration_s
      }
    end

    render json: results.to_json
  end
end
