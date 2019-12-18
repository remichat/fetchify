class UserPlaylist < ApplicationRecord
  validates :user, uniqueness: { scope: :playlist }

  belongs_to :user
  belongs_to :playlist
end
