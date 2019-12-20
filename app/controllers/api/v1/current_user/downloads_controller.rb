class Api::V1::CurrentUser::DownloadsController < ApplicationController
  protect_from_forgery

  def index
  end

  def create
    user = User.find(params[:user_id].to_i)
    download = Download.create(user: user)
    song_ids = params[:song_ids]
    song_ids.each do |song_id|
      SongDownload.create(song: Song.find(song_id), download: download)
    end

  end
end
