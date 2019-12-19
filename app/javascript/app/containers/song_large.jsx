import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongLarge extends Component {
  convertToMin(duration) {
    const minutes = Math.trunc(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`;
  }

  render() {
    const keyMapping = {
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
    }
    const { name, album, artists, key, tempo, duration_s} = this.props.details;
    return (
      <div className="song">
        <div className="checkbox">
          <i className="far fa-circle"></i>
        </div>
        <div className="key-bpm">
          <p>{keyMapping[key]}</p>
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


export default SongLarge;
