class AddSpotifyIdColumnToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :spotify_id, :string
  end
end
