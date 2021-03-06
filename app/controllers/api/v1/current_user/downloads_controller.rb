class Api::V1::CurrentUser::DownloadsController < ApplicationController
  protect_from_forgery

  def index
    user = User.find(params[:user_id].to_i)
    downloads = user.downloads.map do |download|
      download_url = Rails.application.routes.url_helpers.rails_blob_path(download.file, only_path: true) if download.file.attached?
      size = download.file.blob.byte_size.fdiv(1_000_000).round(2) if download.file.attached?

      {
        id: download.id,
        name: download.name,
        download_url: download_url,
        size: size,
        cover_url: download.main_cover,
        status: download.status,
        created_date: download.created_at,
        number_of_tracks_ok: download.song_downloads
                                     .where(status: [SongDownload::STATUSES[:success],SongDownload::STATUSES[:deleted]])
                                     .count,
        number_of_tracks_total: download.songs.count
      }
    end

    render json: downloads.to_json
  end

  def create
    user = User.find(download_params[:user_id].to_i)
    name = params[:name] || Time.now.strftime("%d/%m/%Y %H:%M")
    
    first_x_genres_as_comment = params[:should_add_genre_to_comment] && Download::DEFAULT_NUMBER_OF_GENRES

    download = Download.create(
      user: user,
      name: name,
      status: Download::STATUSES[:ongoing],
      custom_comment: download_params[:custom_comment],
      first_x_genres_as_comment: first_x_genres_as_comment
    ) 
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

  def destroy
    download = Download.find_by(id: params[:id])
    return head :forbidden unless download.present?
    
    download.destroy!
  end

  private

  def download_params
    params.require(:download).permit(:name, :status, :custom_comment, :user_id)
  end
end
