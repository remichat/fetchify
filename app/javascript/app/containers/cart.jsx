import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import SongSmall from '../components/song_small';
import { removeAllSongsFromCart, createDownload } from '../actions';
import displayNotice from '../../components/notice_popup';

const  Cart = (props) => {
  const [collapsed, setCollapsed] = React.useState(true)

  const { removeAllSongsFromCart, createDownload, cartSongs } = props

  const removeAllSongs = () => {
    removeAllSongsFromCart();
  }

  const startDownload = () => {
    if (cartSongs.length > 0) {
      createDownload(cartSongs);
      displayNotice('Your tracks are being prepared. Check your downloads in a moment.');
    }
  }

  return (
    <div id="cart">
      <div className="cart-header" onClick={() => setCollapsed(!collapsed)}>
        <i className="fas fa-shopping-cart"></i>
        <span>{cartSongs.length} TRACKS SELECTED</span>
        <i className={classNames('fas', { 'fa-chevron-up': collapsed, 'fa-chevron-down': !collapsed })}></i>
      </div>
      <div className={classNames('songs-list-small', { 'cart-collapsed': collapsed })}>
        <div className="songs-actions">
          <div id="songs-select">
            <span id="select-all" onClick={removeAllSongs}>Remove all</span>
          </div>
            <span id="download-songs" onClick={startDownload}>
              <i className="fas fa-shopping-cart"/> Prepare download
            </span>
        </div>
        <div className="separator-small">
          <div></div>
          <div></div>
        </div>
        {cartSongs.map(song => <SongSmall key={song.id} details={song} />)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartSongs: state.cartSongs
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAllSongsFromCart, createDownload }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
