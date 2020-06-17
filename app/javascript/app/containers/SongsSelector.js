import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/base/Button'

import { addAllSongsToSelected, removeAllSongsFromSelected, addSongsToCart } from '../actions';


class SongsSelector extends Component {
  addAllToSelection = () => {
    this.props.addAllSongsToSelected(this.props.songs);
  }

  removeAllFromSelection = () => {
    this.props.removeAllSongsFromSelected(this.props.songs);
  }

  addSongsToCart = () => {
    this.props.addSongsToCart(this.props.selectedSongs);
  }

  render() {
    return (
      <div className="songs-actions">
        <div id="songs-select">
          {/* <span id="select-all" onClick={this.addAllToSelection}>Select all</span> */}
          <Button onClick={this.addAllToSelection} rounded inline className='mx-2'>Select all</Button>
          <Button onClick={this.addAllToSelection} rounded inline>Select all</Button>
          {/* <span id="unselect-all" onClick={this.removeAllFromSelection}>Unselect all</span> */}
        </div>
        <Button id="songs-add" onClick={this.addSongsToCart} bold rounded>
          <i className="fas fa-plus"></i> Add selection to cart
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAllSongsToSelected,
    removeAllSongsFromSelected,
    addSongsToCart}, dispatch);
};

const mapStateToProps = (state) => {
  return {
    selectedSongs: state.selectedSongs,
    songs: state.songs
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsSelector);
