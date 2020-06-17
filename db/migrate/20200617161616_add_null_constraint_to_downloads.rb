class AddNullConstraintToDownloads < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:downloads, :name, true, 'Untitled')
  end
end
