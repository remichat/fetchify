import React, { Component } from 'react';

import Cart from './cart';
import PlaylistInfo from './playlist_info';
import PlaylistSongs from './playlist_songs';

class PanelNewDownload extends Component {
  render() {
    return (
      <div id="playlist-main">
        <PlaylistInfo />

        <div className="separator-big">
          <div></div>
          <div></div>
        </div>

        <PlaylistSongs />

        <Cart />
      </div>
    );
  }
}

export default PanelNewDownload;
