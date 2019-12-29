class AddColumnsToDownloads < ActiveRecord::Migration[5.2]
  def change
    add_column :downloads, :public_location, :string
  end
end
