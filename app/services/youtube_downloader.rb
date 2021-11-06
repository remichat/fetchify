class YoutubeDownloader
  def self.download_audio(url, filename)
    cmd = "./bin/yt-dlp -o ./public/tmp_songs/#{filename} #{url}"
    Open3.popen2(cmd) do |stdin, stdout, wait_thr|
      while line = stdout.gets
        puts line
      end
    end
  end
end
