import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SongSmall from '../components/song_small';
import { removeAllSongsFromCart, createDownload } from '../actions';
import displayNotice from '../../components/notice_popup';

class Cart extends Component {
  state = {
    collapsed: true,
    chevronClass: "up",
    songsListClass: "cart-collapsed"
  }

  toggleCollapse = () => {
    if (this.state.collapsed) {
      this.setState({
        collapsed: false,
        chevronClass: "down",
        songsListClass: ""
      });

    } else {
      this.setState({
        collapsed: true,
        chevronClass: "up",
        songsListClass: "cart-collapsed"
      });
    }
  }

  removeAllSongs = () => {
    this.props.removeAllSongsFromCart();
  }

  createDownload = () => {
    if (this.props.cartSongs.length > 0) {
      this.props.createDownload(this.props.cartSongs);
      displayNotice('Your tracks are being prepared. Check your downloads in a moment.');
    }
  }

  render() {
    return (
      <div id="cart">
        <div className="cart-header" onClick={this.toggleCollapse}>
          <i className="fas fa-shopping-cart"></i>
          <span>{this.props.cartSongs.length} TRACKS SELECTED</span>
          <i className={`fas fa-chevron-${this.state.chevronClass}`}></i>
        </div>
        <div className={`songs-list-small ${this.state.songsListClass}`}>
          <div className="songs-actions">
            <div id="songs-select">
              <span id="select-all" onClick={this.removeAllSongs}>Remove all</span>
            </div>
              <span id="download-songs" onClick={this.createDownload}><i className="fas fa-shopping-cart"></i> Prepare download</span>
          </div>
          <div className="separator-small">
            <div></div>
            <div></div>
          </div>
          {this.props.cartSongs.map(song => <SongSmall key={song.id} details={song} />)}
        </div>
      </div>
    );
  }
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
