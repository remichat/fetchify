import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlaylist, resetSelectedSongs, resetSongs } from '../actions'

class Playlist extends Component {
  handleClick = () => {
    this.props.resetSongs();
    this.props.setPlaylist(this.props.details.id, this.props.details.name);
    this.props.resetSelectedSongs();
  }

  handleActiveItems = () => {
    if (this.props.selectedPlaylist.id === this.props.details.id) {
      return "active"
    }
  }

  render() {
    return (
      <span className={this.handleActiveItems()} onClick={this.handleClick}>{this.props.details.name}</span>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedPlaylist: state.selectedPlaylist };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist, resetSelectedSongs, resetSongs }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
