import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { convertToMin } from '../helpers';
import { removeSongFromCart } from '../actions';

class SongSmall extends Component {
  removeSongFromCart = () => {
    this.props.removeSongFromCart(this.props.details)
  }

  render() {
    return (
      <div className="song-small">
        <div className="left">
          <i className="far fa-times-circle" onClick={this.removeSongFromCart}></i>
          <span>{this.props.details.name} - {this.props.details.artists}</span>
        </div>
        <div className="right">{convertToMin(this.props.details.duration_s)}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeSongFromCart }, dispatch);
};


export default connect(null, mapDispatchToProps)(SongSmall);
