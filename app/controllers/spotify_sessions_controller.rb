class SpotifySessionsController < ApplicationController
  def create
    current_user.update(
      access_token: auth_hash.credentials.token,
      refresh_token: auth_hash.credentials.refresh_token,
      expires_at: Time.at(auth_hash.credentials.expires_at),
      name: auth_hash.info.name,
      nickname: auth_hash.info.nickname,
      image: auth_hash.info.image
    )
    redirect_to '/'
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
