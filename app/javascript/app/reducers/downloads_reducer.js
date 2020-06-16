export default function downloadsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_DOWNLOADS':
      return action.payload;
    case 'DELETE_DOWNLOAD' :
      return state.filter(({ id }) => id !== action.payload)
    default:
      return state;
  }
}
