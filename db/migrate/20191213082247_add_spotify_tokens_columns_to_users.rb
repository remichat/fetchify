class AddSpotifyTokensColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :access_token, :string
    add_column :users, :refresh_token, :string
    add_column :users, :expires_at, :timestamp
  end
end
