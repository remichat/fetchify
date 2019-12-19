import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSongToSelected, removeSongFromSelected } from '../actions';

class SongLarge extends Component {
  state = {
    checked: false
  }

  convertToMin(duration) {
    const minutes = Math.trunc(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`;
  }

  keyMapping(key) {
    const keyMappings = {
      0: "C",
      1: "C#",
      2: "D",
      3: "D#",
      4: "E",
      5: "F",
      6: "F#",
      7: "G",
      8: "G#",
      9: "A",
      10: "A#",
      11: "B"
    };
    return keyMappings[key];
  }

  isInSelectedSongs = () => {
    if (this.props.selectedSongs.find(song => song.id == this.props.details.id)) {
      return true;
    }
    return false;
  }

  toggleCheckClass() {
    if (this.isInSelectedSongs()) {
      return "-check";
    }
    else {
      return "";
    }
  }

  handleClick() {
    if (this.isInSelectedSongs()) {
      this.props.removeSongFromSelected(this.props.details);
    }
    else {
      this.props.addSongToSelected(this.props.details);
    }
  }

  render() {
    const { name, album, artists, key, tempo, duration_s} = this.props.details;
    return (
      <div className={`song ${this.toggleCheckClass()}`} onClick={this.handleClick.bind(this)}>
        <div className="checkbox">
          <i className={`far fa${this.toggleCheckClass()}-circle`}></i>
        </div>
        <div className="key-bpm">
          <p>{this.keyMapping(key)}</p>
          <p>{Math.round(tempo)}</p>
        </div>
        <div className="song-infos">
          <div className="d-flex justify-content-between">
            <span className="song-title">{name}</span>
            <span>{this.convertToMin(duration_s)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <div className="artist-album">
              <span>{artists}</span>
              <span> • </span>
              <span>{album}</span>
            </div>
            <div className="genre-tags">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addSongToSelected, removeSongFromSelected }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    selectedSongs: state.selectedSongs
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(SongLarge);
