export default function setPlaylist(playlistId) {
  return {
    type: 'SET_PLAYLIST',
    payload: playlistId
  }
}
