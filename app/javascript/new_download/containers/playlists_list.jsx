import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Playlist from './playlist';
import { fetchPlaylists } from '../actions';

class PlaylistsList extends Component {
  componentDidMount() {
    this.props.fetchPlaylists();
  }

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
  return { playlists: state.playlists };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPlaylists }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsList);
