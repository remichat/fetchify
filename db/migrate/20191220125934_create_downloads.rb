class CreateDownloads < ActiveRecord::Migration[5.2]
  def change
    create_table :downloads do |t|
      t.string :name
      t.string :cover_url
      t.string :status

      t.timestamps
    end
  end
end
