import isNotIncluded from '../../components/is_song_included';

export default function cartSongsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SONGS_TO_CART':
      const newState = [...state];
      action.payload.forEach((song) => {
        if (isNotIncluded(song, newState)) {
          newState.push(song);
        }
      })
      return newState;
    case 'REMOVE_ALL_FROM_CART':
      return action.payload;
    case 'REMOVE_SONG_FROM_CART':
      const newState2 = state.filter(song => song.id != action.payload.id);
      return newState2;
    default:
      return state;
  }
}
