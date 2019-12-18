class SongArtist < ApplicationRecord
  validates :song, uniqueness: { scope: :artist }

  belongs_to :song
  belongs_to :artist
end
