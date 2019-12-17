class Api::V1::CurrentUser::SongsController < ApplicationController
  def index
    playlist = Playlist.find(params[:playlist_id])
    playlist_service = PlaylistsManagementService.new(current_user)
    playlist_service.update_playlist_songs(playlist)
    playlist.reload

    results = playlist.songs.map do |song|
      {
        id: song.id,
        name: song.name,
        album: song.album.name,
        artists: song.artists.map(&:name).join(',')
      }
    end

    render json: results.to_json
  end
end
