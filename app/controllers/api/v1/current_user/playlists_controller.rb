class Api::V1::CurrentUser::PlaylistsController < ApplicationController
  def index
    playlists = User.first.playlists
    results = playlists.map do |playlist|
      {
        id: playlist.id,
        name: playlist.name,
        songs: playlist.songs.map(&:details_hash)
      }
    end

    render json: results.to_json
  end
end
