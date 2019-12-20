class AddFileLocationColmunToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :file_location, :string
  end
end
