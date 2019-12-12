class SpotifySessionsController < ApplicationController
  def create
    @user = User.new(auth_hash)
    # current_user = @user
    redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
