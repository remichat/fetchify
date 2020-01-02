import { userId } from '../helpers';

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

export function resetSongs() {
  return {
    type: 'RESET_SONGS',
    payload: []
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
    type: 'REMOVE_ALL_FROM_SELECTED',
    payload: songs
  }
}


export function resetSelectedSongs() {
  return {
    type: 'RESET_SELECTED',
    payload: []
  }
}

export function addSongsToCart(songs) {
  return {
    type: 'ADD_SONGS_TO_CART',
    payload: songs
  }
}

export function removeAllSongsFromCart() {
  return {
    type: 'REMOVE_ALL_FROM_CART',
    payload: []
  }
}

export function removeSongFromCart(song) {
  return {
    type: 'REMOVE_SONG_FROM_CART',
    payload: song
  }
}

export function createDownload(songs) {
  const url = "/api/v1/current_user/downloads";
  const body = {
      song_ids: songs.map(song => song.id),
      user_id: userId()
    };
  const params = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"
  }

  fetch(url, params)

  return {
    type: 'CREATE_DOWNLOAD',
    payload: []
  }
}

export function fetchDownloads() {
  const url = `/api/v1/current_user/downloads?user_id=${userId()}`;
  const apiPromise = fetch(url, { credentials: "same-origin" })
            .then(response => response.json())
            .then((data) => {
              return data;
            });

  return {
    type: 'FETCH_DOWNLOADS',
    payload: apiPromise
  }
}
