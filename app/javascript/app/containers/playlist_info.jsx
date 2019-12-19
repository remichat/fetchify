import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlaylistInfo extends Component {
  render() {
    const { name, cover_url, number_of_tracks } = this.props.selectedPlaylist
    const style= {
      backgroundImage: `url(${cover_url || "https://cdn3.iconfinder.com/data/icons/objects-shapes-emojis/513/emoji-emoticon-shape-happy-face-smiley_33-512.png"})`
    }
    return (
      <div id="playlist-info">
        <div className="cover-playlist" style={style}>
        </div>
        <div className="playlist-details">
          <div className="title-tile">
            <h2>{name}</h2>
            <h3>{number_of_tracks} TRACKS</h3>
          </div>
          <div className="tags">
            <span>house techno</span>
            <span>EDM</span>
            <span>varieté</span></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.selectedPlaylist
  }
};

export default connect(mapStateToProps)(PlaylistInfo);
