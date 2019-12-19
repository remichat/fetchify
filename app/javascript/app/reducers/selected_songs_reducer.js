export default function selectedSongsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SONG_TO_SELECTED': {
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    }
    case 'ADD_ALL_SONGS_TO_SELECTED': {
      console.log('dkfhdfhtt');
      return action.payload;
    }
    case 'REMOVE_SONG_FROM_SELECTED': {
      const newState = state.filter(song => song.id != action.payload.id);
      return newState;
    }
    case 'REMOVE_ALL_SONGS': {
      const ids = action.payload.map(song => song.id);
      const newState = state.filter(song => !ids.includes(song.id));
      return newState;
    }
    default:
      return state;
  }
}
