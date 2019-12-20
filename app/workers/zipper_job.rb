class ZipperJob < ApplicationJob
  queue_as :default

  def perform(download_id)
    download = Download.find(download_id)
    songs = download.songs

    # IL FAUT FOUTRE LES VRAIS FICHIERS DE SON ET NON PAS LES FICHEIRS EN DUR
    # L'URL DE DL NE DURE QUE 5 MINUTES => IL FAUT LA RECUPERER AU MOMENT DE L'AFFICHAGE
    # IL FAUT CHANGER LE NOM DE FICHIER PAR LE NOM DU SON
    # IL FAUDRAIT EDITER LES METADATA ( A VOIR SI NOUVELLE GEM OU SI .METADATA)
    # IL FAUT CACHER L'URL DE DOWNLOAD

    folder = "./public/songs/"
    input_filenames = ['2.mp3', '3.mp3']

    zipfile_name = "./public/downloads/#{download.id}.zip"

    require 'zip'
    Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
      input_filenames.each do |filename|
        zipfile.add(filename, File.join(folder, filename))
      end
    end

    download.file.attach(io: File.open("./public/downloads/#{download.id}.zip"), filename: "#{download.id}.zip")
    download.public_location = Rails.application.routes.url_helpers.rails_blob_path(download.file, only_path: true)
    download.save
  end
end
