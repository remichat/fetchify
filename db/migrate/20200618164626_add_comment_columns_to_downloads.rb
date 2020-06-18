class AddCommentColumnsToDownloads < ActiveRecord::Migration[5.2]
  def change
    add_column :downloads, :custom_comment, :string
    add_column :downloads, :first_x_genres_as_comment, :integer
  end
end
