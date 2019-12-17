import React from 'react';

import PlaylistsList from '../containers/playlists_list';
import Songs from '../containers/songs';

class App extends React.Component {
  render() {
    return (
      <div className="new-download-app">
        <PlaylistsList />
        <Songs />
      </div>
    );
  }
}

export default App;
