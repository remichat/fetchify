export function setPlaylist(playlistId) {
  return {
    type: 'SET_PLAYLIST',
    payload: playlistId
  }
}

export function fetchPlaylists() {
  const url = "/api/v1/current_user/playlists";
  const apiPromise = fetch(url, { credentials: "same-origin" })
            .then(response => response.json())
            .then((data) => {
              return data;
            })

  return {
    type: 'FETCH_PLAYLISTS',
    payload: apiPromise
  }
}

export function fetchSongs(playlistId) {
  const url = `/api/v1/current_user/playlists/${playlistId}/songs`;
  const apiPromise = fetch(url, { credentials: "same-origin" })
            .then(response => response.json())
            .then((data) => {
              return data;
            })

  return {
    type: 'FETCH_SONGS',
    payload: apiPromise
  }
}

export function addSongToSelected(song) {
  return {
    type: 'ADD_SONG_TO_SELECTED',
    payload: song
  }
}

export function removeSongFromSelected(song) {
  return {
    type: 'REMOVE_SONG_FROM_SELECTED',
    payload: song
  }
}

export function addAllSongsToSelected(songs) {
  return {
    type: 'ADD_ALL_SONGS_TO_SELECTED',
    payload: songs
  }
}

export function removeAllSongsFromSelected(songs) {
  return {
    type: 'REMOVE_ALL_SONGS',
    payload: songs
  }
}
