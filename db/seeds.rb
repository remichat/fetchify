Album.create!(name: "Alive 2007")
Artist.create!(name: "Daft Punk")
Song.create!(name: "Better Faster", album: Album.last)
SongArtist.create!(song: Song.last, artist: Artist.last)
Playlist.create!(name: "Playlist de l'année")
PlaylistSong.create!(playlist: Playlist.last, song: Song.last)
User.create!(email: "seed@seed.com", password: "seedseed")
UserPlaylist.create!(user: User.last, playlist: Playlist.last)

