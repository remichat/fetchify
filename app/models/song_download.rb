class SongDownload < ApplicationRecord
  belongs_to :song
  belongs_to :download
end
