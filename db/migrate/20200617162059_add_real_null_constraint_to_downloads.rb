class AddRealNullConstraintToDownloads < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:downloads, :name, false, 'Untitled')
  end
end
