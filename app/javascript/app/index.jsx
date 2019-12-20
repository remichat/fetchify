// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';


// internal modules
import App from './components/app';

// State and reducers
import playlistsReducer from './reducers/playlists_reducer';
import songsReducer from './reducers/songs_reducer';
import selectedPlaylistReducer from './reducers/selected_playlist_reducer';
import selectedSongsReducer from './reducers/selected_songs_reducer';
import cartSongsReducer from './reducers/cart_songs_reducer';

const reducers = combineReducers({
  playlists: playlistsReducer,
  songs: songsReducer,
  selectedPlaylist: selectedPlaylistReducer,
  selectedSongs: selectedSongsReducer,
  cartSongs: cartSongsReducer
});

const initialState = {
  playlists: [],
  songs: [],
  selectedPlaylist: {id: null, name: "plop", number_of_tracks: 0},
  selectedSongs: [],
  cartSongs: []
};

const middlewares = applyMiddleware(reduxPromise, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, composeEnhancers(middlewares))}>
    <App />
  </Provider>,
  document.getElementById('root')
);
