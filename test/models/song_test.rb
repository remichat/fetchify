require 'test_helper'

class SongTest < ActiveSupport::TestCase

  test "Song should have a name" do
    album = Album.create(name:"album", spotify_id: "1234")
    test_song = Song.create(spotify_id: "123", album: album)

    assert !test_song.valid?
  end

  test "Song should have a spotify_id" do
    album = Album.create(name:"album", spotify_id: "1234")
    test_song = Song.create(name:"toto", album: album)

    assert !test_song.valid?
  end

  test "Song should have an album" do
    test_song = Song.create(name:"toto", spotify_id: "124")

    assert !test_song.valid?
  end

  test "details_hash should return a hash of details" do
    album = Album.create(name:"album", spotify_id: "1234")

    test_song = Song.create(name: "toto", spotify_id: "123456", album: album)
    details_hash = test_song.details_hash
    expected_hash = {
      name: "toto",
      artists: nil,
      album: "album",
      preview_url: nil
    }

    assert_equal details_hash, expected_hash

    test_song = Song.create(name: "tata", spotify_id: "123457", album: album)
    artist1 = Artist.create(name: "artist1", spotify_id: "12345")
    artist2 = Artist.create(name: "artist2", spotify_id: "12346")
    SongArtist.create(artist: artist1, song: test_song)
    SongArtist.create(artist: artist2, song: test_song)
    details_hash = test_song.details_hash
    expected_hash = {
      name: "tata",
      artists: "artist1, artist2",
      album: "album",
      preview_url: nil
    }

    assert_equal details_hash, expected_hash


  end

end
