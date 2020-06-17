import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import moment from 'moment';

import Modal from '../components/base/Modal'
import useModal from '../hooks/useModal'
import { removeAllSongsFromCart, createDownload } from '../actions';
import displayNotice from '../../components/notice_popup';
import SongSmall from '../components/SongSmall';
import Button from '../components/base/Button'

const  Cart = (props) => {
  const { removeAllSongsFromCart, createDownload, cartSongs, selectedPlaylist } = props
  const [collapsed, setCollapsed] = React.useState(true)
  const [downloadName, setDownloadName] = React.useState(selectedPlaylist.name)
  const { isShowingModal, displayModal, hideModal } = useModal()

  React.useEffect(() => {
    if(downloadName && downloadName !== selectedPlaylist.name) return

    setDownloadName(selectedPlaylist.name)
  }, [selectedPlaylist])

  const removeAllSongs = () => {
    removeAllSongsFromCart();
  }

  const showSettingsModal = () => {
    if (cartSongs.length === 0) return
    
    displayModal()
  }

  const startDownload = () => {
    createDownload(downloadName, cartSongs);
    hideModal()
    displayNotice('Your tracks are being prepared. Check your downloads in a moment.');
  }

  return (
    <>
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
            <Button id="download-songs" onClick={showSettingsModal} bold blue>
            <i className="fas fa-shopping-cart"/> Prepare download
            </Button>
          </div>
          <div className="separator-small">
            <div></div>
            <div></div>
          </div>
          {cartSongs.map(song => <SongSmall key={song.id} details={song} />)}
        </div>
      </div>
      <Modal isShowing={isShowingModal} hide={hideModal} headerContent={'Download settings'}>
        <p className='mb-1'>Name</p>
        <input type="text" className='mb-3' value={downloadName} onChange={(event) => setDownloadName(event.target.value)}/>
        <Button width100 onClick={startDownload}>
          Start Download
        </Button>
      </Modal>
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    cartSongs: state.cartSongs,
    selectedPlaylist: state.selectedPlaylist
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAllSongsFromCart, createDownload }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
