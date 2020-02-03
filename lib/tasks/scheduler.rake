desc "remove download zip file > 7 days old"
task :clean_zips => :environment do
  puts "Cleaning zips..."
  Download.destroy_old_zips
  puts "done."
end
