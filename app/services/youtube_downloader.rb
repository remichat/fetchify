class YoutubeDownloader
  YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v='.freeze

  def initialize
    @client = Google::Apis::YoutubeV3::YouTubeService.new
    @client.key = ENV['YOUTUBE_API_KEY']
  end

  def download_audio(search_query, duration_in_s, file_name)
    video_url = find_youtube_video_url(search_query, duration_in_s)
    return nil if video_url.blank?

    download_audio_from_url(video_url, file_name)
  end

  private

  def download_audio_from_url(url, file_name)
    file_path = "#{Song::SONG_TEMPORARY_DOWNLOAD_PATH}#{file_name}"
    cmd = "./bin/yt-dlp -f \"bestaudio/best\" -ciw -o \"#{file_path}.%(ext)s\" \
    --extract-audio --audio-quality 0 --audio-format mp3 --ffmpeg-location ./bin/ffmpeg #{url}"

    Open3.popen3(cmd) do |stdin, stdout, stderr, wait_thr|
      while line = stdout.gets
        puts line
      end

      return nil if stderr.read.present?
    end

    "#{file_path}.mp3"
  end

  def find_youtube_video_url(search_query, duration_in_s)
    search_result = @client.list_searches('snippet', type: 'id', q: search_query)
    video_ids = search_result.items.map { |video| video.id.video_id }

    result = @client.list_videos('contentDetails', id: video_ids)
    videos_details = result.items.map do |video|
      {
        id: video.id,
        duration: ISO8601::Duration.new(video.content_details.duration).to_seconds.to_i
      }
    end

    video =
      videos_details
        .select { |video_details| (video_details[:duration] - duration_in_s).abs < 10 }
        .sort_by { |video| video[:duration] }
        &.first

    video ? YOUTUBE_BASE_URL + video[:id] : nil
  end
end
