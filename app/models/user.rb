class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_playlists
  has_many :playlists, through: :user_playlists
  has_many :songs, through: :playlists
  has_many :artists, through: :songs
  has_many :albums, through: :songs
  has_many :downloads

  def refresh_token_from_spotify
    return unless should_refresh?

    self.access_token = new_token["access_token"]
    self.expires_at = Time.now + 3600
    save
  end

  private

  def should_refresh?
    expires_at < Time.now
  end

  def new_token
    url = "https://accounts.spotify.com/api/token"
    body = {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    }
    authorization = Base64.strict_encode64("#{ENV['SPOTIFY_CLIENT_ID']}:#{ENV['SPOTIFY_CLIENT_SECRET']}")
    headers = { Authorization: "Basic #{authorization}" }
    response = RestClient.post(url, body, headers)
    JSON.parse(response.body)
  end
end
