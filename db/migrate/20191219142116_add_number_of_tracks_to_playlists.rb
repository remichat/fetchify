class AddNumberOfTracksToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :number_of_tracks, :integer
  end
end
