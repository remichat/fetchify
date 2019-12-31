export default function downloadsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_DOWNLOADS':
      return action.payload;
    default:
      return state;
  }
}
