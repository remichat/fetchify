export default function songsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_SONGS':
      return action.payload;
    default:
      return state;
  }
}
