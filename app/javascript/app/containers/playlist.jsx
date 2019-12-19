import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlaylist } from '../actions'

class Playlist extends Component {
  handleClick = () => {
    this.props.setPlaylist(this.props.details)
  }
  render() {
    return (
      <span onClick={this.handleClick}>{this.props.details.name}</span>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist }, dispatch);
};

export default connect(null, mapDispatchToProps)(Playlist);
