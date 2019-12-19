import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SongLarge from './song_large';
import SongsSelector from './songs_selector';

import { fetchSongs } from '../actions';

class PlaylistSongs extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.selectedPlaylist !== prevProps.selectedPlaylist) {
      this.props.fetchSongs(this.props.selectedPlaylist.id)
    }
  }
  render() {
    return (
      <div className="songs-list">
        <SongsSelector />

        <div className="separator-small">
          <div></div>
          <div></div>
        </div>

        <div className="songs-panel">
          {this.props.songs.map((song) => <SongLarge key={song.id} details={song}/>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    selectedPlaylist: state.selectedPlaylist
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSongs }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSongs);
