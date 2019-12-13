class Api::V1::CurrentUser::PlaylistsController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    render json: User.first.playlists.to_json
  end
end
