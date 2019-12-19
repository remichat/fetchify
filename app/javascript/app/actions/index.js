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
