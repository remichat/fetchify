export default function playlistsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_PLAYLISTS': {
      console.log(action)
      return action.payload;
    }
    default:
      return state;
  }
}
