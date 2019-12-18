class PlaylistSong < ApplicationRecord
  validates :song, uniqueness: { scope: :playlist }

  belongs_to :playlist
  belongs_to :song
end
