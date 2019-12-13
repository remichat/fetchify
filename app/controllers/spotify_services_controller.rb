class SpotifyServicesController < ApplicationController
  def self.songs_from_url(track_ids)
    headers = { Authorization: "Bearer #{User.first.access_token}" }
    ids = track_ids.join(',')
    response = RestClient.get("https://api.spotify.com/v1/tracks?ids=#{ids}", headers)
    JSON.parse(response)

    # toto["tracks"][0]["album"]["name] / ["id"]
    # toto["tracks"][0]["artists"][0]["name"] / ["id"]// arsitst est un array
    # toto["tracks"][0]["preview_url"]
    # toto["tracks"][0]["duration_ms"]
    # toto["tracks"][0]["name"]
    # toto["tracks"][0]["id"]
  end

  def self.songs_from_url(url)
    headers = { Authorization: "Bearer #{User.first.access_token}" }
    response = RestClient.get(url, headers)

    # toto["items"][0]["track"].keys --> meme topo qu'au dessus.

   #  ["album",
   # "artists",
   # "available_markets",
   # "disc_number",
   # "duration_ms",
   # "episode",
   # "explicit",
   # "external_ids",
   # "external_urls",
   # "href",
   # "id",
   # "is_local",
   # "name",
   # "popularity",
   # "preview_url",
   # "track",
   # "track_number",
   # "type",
   # "uri"]


    JSON.parse(response)
  end
end
