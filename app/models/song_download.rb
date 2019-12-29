class SongDownload < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    failed: 'FAILED',
    success: 'SUCCESS'
  }

  validates :status, inclusion: { in: STATUSES.values }

  belongs_to :song
  belongs_to :download
end
