class AddStatusToSongDownloads < ActiveRecord::Migration[5.2]
  def change
    add_column :song_downloads, :status, :string
  end
end
