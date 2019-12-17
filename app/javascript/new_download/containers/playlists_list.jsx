import React, { Component } from 'react';
import { connect } from 'react-redux';

import Playlist from './playlist'

class PlaylistsList extends Component {
  render() {
    return (
      <div className="playlists-panel">
        <h2>Playlists</h2>
        <ul className="list">
          {this.props.playlists.map((playlist) => <li key={playlist.id}><Playlist details={playlist}/></li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists
  };
};

export default connect(mapStateToProps)(PlaylistsList);
