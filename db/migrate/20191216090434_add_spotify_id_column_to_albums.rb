class AddSpotifyIdColumnToAlbums < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :spotify_id, :string
  end
end
