import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addAllSongsToSelected, removeAllSongsFromSelected } from '../actions';


class SongsSelector extends Component {
  addAll = () => {
    this.props.addAllSongsToSelected(this.props.songs);
  }

  removeAll = () => {
    this.props.removeAllSongsFromSelected(this.props.songs);
  }

  render() {
    return (
      <div id="songs-actions">
        <div id="songs-select">
          <span id="select-all" onClick={this.addAll}>Select all</span>
          <span id="unselect-all" onClick={this.removeAll}>Unselect all</span>
        </div>
        <span id="songs-add"><i className="fas fa-plus"></i> Add selection to cart</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addAllSongsToSelected, removeAllSongsFromSelected }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    selectedSongs: state.selectedSongs,
    songs: state.songs
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsSelector);
