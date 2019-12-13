class CreateSongArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :song_artists do |t|
      t.references :song, foreign_key: true
      t.references :artist, foreign_key: true

      t.timestamps
    end
  end
end
