class AddUserToDownloads < ActiveRecord::Migration[5.2]
  def change
    add_reference :downloads, :user, foreign_key: true
  end
end
