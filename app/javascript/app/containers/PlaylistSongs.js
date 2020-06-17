import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SongLarge from './SongLarge';
import SongsSelector from './SongsSelector';

import { fetchSongs } from '../actions';

class PlaylistSongs extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.selectedPlaylist !== prevProps.selectedPlaylist) {
      this.props.fetchSongs(this.props.selectedPlaylist.id)
    }
  }

  renderSongsPanel() {
    if (this.props.songs.length === 0) {
      return (
        <div className="loader-gif-container">
          <img src={require('../../../assets/images/loading_spinner.gif')} className="loader-gif" alt="loading gif"/>
        </div>
      );
    }else {
      return this.props.songs.map((song) => <SongLarge key={song.id} details={song}/>);
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
          {this.renderSongsPanel()}
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
