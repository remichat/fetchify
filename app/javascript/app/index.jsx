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
import downloadsReducer from './reducers/downloads_reducer';

const reducers = combineReducers({
  playlists: playlistsReducer,
  songs: songsReducer,
  selectedPlaylist: selectedPlaylistReducer,
  selectedSongs: selectedSongsReducer,
  cartSongs: cartSongsReducer,
  downloads: downloadsReducer
});

const initialState = {
  playlists: [],
  songs: [],
  selectedPlaylist: {id: null, name: "plop", number_of_tracks: 0},
  selectedSongs: [],
  cartSongs: [],
  downloads: [
    {download_url: null,
    size: null,
    cover_url: "https://mosaic.scdn.co/300/10d79086d13664d7631a1a3dda4662286ffc2a30ab67616d0000b273b94203efb252305b712e3538ab67616d0000b273c709fcd1fa691104f7d9916fab67616d0000b273f81935f794c1112bbda4de81",
    status: null,
    created_date: "2019-12-21T22:11:32.327Z"
    }]
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
