class CreateUserPlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :user_playlists do |t|
      t.references :user, foreign_key: true
      t.references :playlist, foreign_key: true

      t.timestamps
    end
  end
end
