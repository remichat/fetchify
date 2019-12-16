class SpotifyService
  def self.songs_from_playlist(playlist_id, access_token)
    url = "https://api.spotify.com/v1/playlists/#{playlist_id}/tracks"
    headers = { Authorization: "Bearer #{access_token}" }
    response = RestClient.get(url, headers)
    JSON.parse(response)
  end

  def self.user_playlists(user_id, access_token)
    url = "https://api.spotify.com/v1/users/#{user_id}/playlists"
    headers = { Authorization: "Bearer #{access_token}" }
    response = RestClient.get(url, headers)
    JSON.parse(response)
  end
end
