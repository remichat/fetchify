import React, { Component } from 'react';

import Cart from './cart';
import PlaylistInfo from './playlist_info';
import PlaylistSongs from './playlist_songs';
import { connect } from 'react-redux';

class PanelNewDownload extends Component {
  content() {
    console.log(this.props.selectedPlaylist);
    if (this.props.selectedPlaylist.id == null) {
      return "hidden"
    }
  }

  render() {
    return (
      <div id="playlist-main" className={this.content()}>
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

const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.selectedPlaylist
  }
};

export default connect(mapStateToProps)(PanelNewDownload);
