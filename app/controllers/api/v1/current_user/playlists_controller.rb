class Api::V1::CurrentUser::PlaylistsController < ApplicationController
  def index
    playlist_service = PlaylistsManagementService.new(current_user)
    playlist_service.update_user_playlists
    results = current_user.playlists.map do |playlist|
      {
        id: playlist.id,
        name: playlist.name
        # songs: playlist.songs.map(&:details_hash)
      }
    end

    render json: results.to_json
  end
end
