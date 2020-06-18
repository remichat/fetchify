class SpotifyService
  def initialize(user_info = {})
    @user_id = user_info[:nickname]
    @access_token = user_info[:access_token]
    @tracks = []
    @playlists = []
  end

  def fetch_songs_from_playlist(playlist_id)
    fields = "items(track(id,name,album(id,name),artists,preview_url)),next"
    fields = CGI.escape(fields)
    url = "https://api.spotify.com/v1/playlists/#{playlist_id}/tracks?fields=#{fields}"
    @tracks = []
    songs_from_url(url)
  end

  def fetch_user_playlists
    fields = "items(name,id,images,tracks(href,total)),next"
    fields = CGI.escape(fields)
    user_id = CGI.escape(@user_id)
    url = "https://api.spotify.com/v1/users/#{user_id}/playlists?fields=#{fields}&limit=50"
    @playlists = []
    playlists_from_url(url)
  end

  def fetch_tracks_features(spotify_ids)
    fields = "audio_features(id,tempo,key,energy,speechiness,instrumentalness,danceability,duration_ms)"
    fields = CGI.escape(fields)
    url = "https://api.spotify.com/v1/audio-features?fields=#{fields}"
    ids_sliced = spotify_ids.each_slice(100).to_a

    features = []
    ids_sliced.each do |slice_ids|
      response = request_spotify("#{url}&ids=#{slice_ids.join(',')}")
      response["audio_features"].each { |song| features << song }
    end
    features
  end

  def fetch_genres_from_url(url)
    request_spotify(url)['genres']
  end

  def request_spotify(url)
    headers = { Authorization: "Bearer #{@access_token}" }
    response = RestClient.get(url, headers)
    JSON.parse(response)
  end
  private

  def playlists_from_url(url)
    response = request_spotify(url)
    response["items"].each { |playlist| @playlists << playlist }
    playlists_from_url(response["next"]) if response["next"].present?
    @playlists
  end

  def songs_from_url(url)
    response = request_spotify(url)
    response["items"].each { |track| @tracks << track }
    songs_from_url(response["next"]) if response["next"].present?
    @tracks
  end

  def track_features(track_id)
    url = "https://api.spotify.com/v1/audio-features/#{track_id}"
    request_spotify(url)
  end

end
