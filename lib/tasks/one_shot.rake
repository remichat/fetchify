desc "remove tmp files"
task :clean_tmp_folder, [:is_real_run] do |task, args|
    require 'fileutils'
    puts "Finding files"
    objects = Dir['public/tmp_songs/*']
    puts "#{objects.size} objects"

    objects.each do |object|
        if File.file?(object)
            if /.*\.mp3/.match?(object)
                File.delete(object) if args[:is_real_run]
                puts "File #{object} deleted"
            else 
                puts "File #{object} left"
            end
        else
            FileUtils.rm_rf(object) if args[:is_real_run]
            puts "Dir #{object} deleted"
        end
    end
    puts "done."
end