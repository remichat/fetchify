class CreateSongDownloads < ActiveRecord::Migration[5.2]
  def change
    create_table :song_downloads do |t|
      t.references :song, foreign_key: true
      t.references :download, foreign_key: true

      t.timestamps
    end
  end
end
