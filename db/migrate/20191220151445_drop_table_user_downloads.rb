class DropTableUserDownloads < ActiveRecord::Migration[5.2]
  def change
    drop_table :user_downloads
  end
end
