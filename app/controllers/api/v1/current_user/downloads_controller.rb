class Api::V1::CurrentUser::DownloadsController < ApplicationController
  protect_from_forgery

  def index
    user = User.find(params[:user_id].to_i)
    downloads = user.downloads.map do |download|
      download_url = Rails.application.routes.url_helpers.rails_blob_path(download.file, only_path: true) if download.file.attached?
      size = download.file.blob.byte_size.fdiv(1_000_000).round(2) if download.file.attached?

      {
        id: download.id,
        download_url: download_url,
        size: size,
        cover_url: download.main_cover,
        status: download.status,
        created_date: download.created_at,
        number_of_tracks_ok: download.song_downloads.where(status: SongDownload::STATUSES[:success]).count,
        number_of_tracks_total: download.songs.count
      }
    end

    render json: downloads.to_json
  end

  def create
    user = User.find(params[:user_id].to_i)
    download = Download.create(user: user, status: Download::STATUSES[:ongoing])
    song_ids = params[:song_ids]
    song_ids.each do |song_id|
      song_download = SongDownload.create(
        song: Song.find(song_id),
        download: download
      )
      song_download.start_download
    end
  end

  def update
    return unless download_params[:status] == "ONGOING"
    return unless params[:id]

    download = Download.find(params[:id])

    download.update(status: Download::STATUSES[:ongoing])
    download.song_downloads.each(&:start_download)
  end

  def download_params
    params.require(:download).permit(:status)
  end
end
