import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlaylist, resetSelectedSongs } from '../actions'

class Playlist extends Component {
  handleClick = () => {
    this.props.setPlaylist(this.props.details);
    this.props.resetSelectedSongs();
  }
  render() {
    return (
      <span onClick={this.handleClick}>{this.props.details.name}</span>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist, resetSelectedSongs }, dispatch);
};

export default connect(null, mapDispatchToProps)(Playlist);
