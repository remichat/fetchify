class AddSpotifyIdColumnToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :spotify_id, :string
  end
end
