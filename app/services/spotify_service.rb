class SpotifyService
  def initialize(user_info = {})
    @user_id = user_info[:nickname]
    @access_token = user_info[:access_token]
    @tracks = []
  end

  def songs_from_playlist(playlist_id)
    fields = "items(track(id,name,album(id,name),artists,preview_url)),next"
    fields = CGI.escape(fields)
    url = "https://api.spotify.com/v1/playlists/#{playlist_id}/tracks?fields=#{fields}"
    @tracks = []
    songs_from_url(url)
  end

  def user_playlists
    fields = "items(name,id,tracks(href,total)),next"
    fields = CGI.escape(fields)
    url = "https://api.spotify.com/v1/users/#{@user_id}/playlists?fields=#{fields}&limit=50"
    response = request_spotify(url)
    response["items"]
  end

  private

  def songs_from_url(url)
    response = request_spotify(url)
    response["items"].each { |track| @tracks << track}
    songs_from_url(response["next"]) if response["next"].present?
    @tracks
  end

  def track_features(track_id)
    url = "https://api.spotify.com/v1/audio-features/#{track_id}"
    request_spotify(url)
  end

  def request_spotify(url)
    headers = { Authorization: "Bearer #{@access_token}" }
    response = RestClient.get(url, headers)
    JSON.parse(response)
  end
end
