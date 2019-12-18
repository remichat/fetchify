import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlaylist } from '../actions'

class Playlist extends Component {
  handleClick = () => {
    this.props.setPlaylist(this.props.details.id)
  }
  render() {
    return (
      <h5 onClick={this.handleClick}>{this.props.details.name}</h5>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPlaylistId: state.selectedPlaylistId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
