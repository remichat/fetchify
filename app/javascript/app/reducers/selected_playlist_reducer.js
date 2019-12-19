export default function seelctedPlaylistReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_PLAYLIST':
      return action.payload
    default:
      return state;
  }
}
