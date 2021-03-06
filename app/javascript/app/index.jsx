// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import * as Sentry from '@sentry/react';

// internal modules
import App from './components/App';

// State and reducers
import playlistsReducer from './reducers/playlists_reducer';
import songsReducer from './reducers/songs_reducer';
import selectedPlaylistReducer from './reducers/selected_playlist_reducer';
import selectedSongsReducer from './reducers/selected_songs_reducer';
import cartSongsReducer from './reducers/cart_songs_reducer';
import downloadsReducer from './reducers/downloads_reducer';

Sentry.init({dsn: process.env.SENTRY_DSN_FRONT});

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
  selectedPlaylist: {id: null, name: null},
  selectedSongs: [],
  cartSongs: [],
  downloads: []
};

const middlewares = applyMiddleware(reduxPromise, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootTag = document.getElementById('root');
if (rootTag) {
  ReactDOM.render(
    <Provider store={createStore(reducers, initialState, composeEnhancers(middlewares))}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

