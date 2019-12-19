import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Cart extends Component {
  render() {
    return (
      <div id="cart">
        <div className="cart-header">
          <span>12 TRACKS</span>
          <i className="fas fa-chevron-up"></i>
        </div>
        <div className="songs-list-small cart-collapsed">
            <div id="songs-select">
              <span id="select-all">Remove all</span>
            </div>
          <div className="separator-small">
            <div></div>
            <div></div>
          </div>
          <div className="song-small">
            <div className="left">
              <i className="far fa-times-circle"></i>
              <span>La danse du Scorpion - Sebastien Leger</span>
            </div>
            <div className="right">4:23</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
