import isNotIncluded from '../../components/is_song_included';

export default function selectedSongsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SONG_TO_SELECTED': {
      if (isNotIncluded(action.payload, state)) {
        const newState = [...state];
        newState.push(action.payload);
        return newState;
      }
      return state;
    }
    case 'ADD_ALL_SONGS_TO_SELECTED': {
      const newState = [...state];
      action.payload.forEach((song) => {
        if (isNotIncluded(song, newState)) {
          newState.push(song);
        }
      })
      return newState;
    }
    case 'REMOVE_SONG_FROM_SELECTED': {
      const newState = state.filter(song => song.id != action.payload.id);
      return newState;
    }
    case 'REMOVE_ALL_FROM_SELECTED': {
      const ids = action.payload.map(song => song.id);
      const newState = state.filter(song => !ids.includes(song.id));
      return newState;
    }
    default:
      return state;
  }
}
