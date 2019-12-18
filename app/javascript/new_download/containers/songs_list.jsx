import React, { Component } from 'react';
import { connect } from 'react-redux';

import Song from './song';

class SongsList extends Component {
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
    songs: state.songs
  }
}

export default connect(mapStateToProps)(SongsList);
