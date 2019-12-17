class AddColumnsToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :tempo, :float
    add_column :songs, :key, :integer
    add_column :songs, :energy, :float
    add_column :songs, :speechiness, :float
    add_column :songs, :instrumentalness, :float
    add_column :songs, :danceability, :float
    add_column :songs, :duration_s, :integer
  end
end
