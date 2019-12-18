import React from 'react';

import PlaylistsList from '../containers/playlists_list';
import SongsList from '../containers/songs_list';

class App extends React.Component {
  render() {
    return (
      <div className="new-download-app">
        <PlaylistsList />
        <SongsList />
      </div>
    );
  }
}

export default App;
