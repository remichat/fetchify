// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules
import App from './components/app';

// State and reducers
import playlistsReducer from './reducers/playlists_reducer';
import songsReducer from './reducers/songs_reducer';
import selectedPlaylistReducer from './reducers/selected_playlist_reducer';

const reducers = combineReducers({
  playlists: playlistsReducer,
  songs: songsReducer,
  selectedPlaylistId: selectedPlaylistReducer
});

const initialState = {
  playlists: [
    {
      "id":1,
      "name":"First Playlist"
    },
    {
      "id":2,
      "name":"Second Playlist"
    },
    {
      "id":3,
      "name":"Third Playlist"
    }
  ],
  songs: [
    {
      "album": "EDM Sucks / Island Boy",
      "artists": "Gammer,Showtek",
      "danceability": 0.501,
      "duration_s": 189,
      "energy": 0.788,
      "id": 1053,
      "instrumentalness": 0.00114,
      "key": 10,
      "name": "EDM Sucks",
      "speechiness": 0.134,
      "tempo": 150.137
    },
    {
      "album": "EDM Sucks / Island Boy",
      "artists": "Gammer,Showtek",
      "danceability": 0.501,
      "duration_s": 189,
      "energy": 0.788,
      "id": 153,
      "instrumentalness": 0.00114,
      "key": 10,
      "name": "EDM Sucks",
      "speechiness": 0.134,
      "tempo": 150.137
    }
  ],
  selectedPlaylistId: null
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
