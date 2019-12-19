class AddPlaylistImageToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :cover_url, :string
  end
end
