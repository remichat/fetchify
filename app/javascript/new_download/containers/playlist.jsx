import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import setPlaylist from '../actions'

class Playlist extends Component {
  handleClick = () => {
    this.props.setPlaylist(this.props.details.id)
    // this.props.setSongs(this.selectedPlaylist)
  }
  render() {
    return (
      <h5 onClick={this.handleClick}>{this.props.details.name}</h5>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.selectedPlaylist
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist }, dispatch);
};

export default connect(null, mapDispatchToProps)(Playlist);
