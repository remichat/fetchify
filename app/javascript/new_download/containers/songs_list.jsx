import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Song from './song';

import { fetchSongs } from '../actions';

class SongsList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.selectedPlaylistId !== prevProps.selectedPlaylistId) {
      this.props.fetchSongs(this.props.selectedPlaylistId)
    }
  }
  render() {
    return (
      <div className="songs-panel">
        {this.props.songs.map((song) => <Song key={song.id} details={song}/>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    selectedPlaylistId: state.selectedPlaylistId
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSongs }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
