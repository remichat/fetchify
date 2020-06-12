class SongDownload < ApplicationRecord
  STATUSES = {
    ongoing: 'ONGOING',
    failed: 'FAILED',
    success: 'SUCCESS',
    deleted: 'DELETED'
  }

  validates :status, inclusion: { in: STATUSES.values }

  belongs_to :song
  belongs_to :download

  def start_download
    self.status = STATUSES[:ongoing]
    save
    DownloaderJob.perform_later(id)
  end
end
