import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlaylist, fetchSongs } from '../actions'

class Playlist extends Component {
  componentDidUpdate(prevProps) {
    // console.log(`before ${this.props.selectedPlaylistId}`)
    // console.log(`after ${prevProps.selectedPlaylistId}`)
    // if (this.props.selectedPlaylistId !== prevProps.selectedPlaylistId) {
    //   this.props.fetchSongs(this.props.selectedPlaylistId)
    // }
  }

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
  return bindActionCreators({
      setPlaylist,
      fetchSongs
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
