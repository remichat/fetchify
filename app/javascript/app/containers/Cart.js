import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import Modal from '../components/base/Modal'
import useModal from '../hooks/useModal'
import { removeAllSongsFromCart, createDownload } from '../actions'
import displayNotice from '../../components/notice_popup'
import SongSmall from '../components/SongSmall'
import Button from '../components/base/Button'
import Separator from '../components/base/Separator'

const SettingsModal = ({ isShowingModal, hideModal, createDownload, defaultName, cartSongs }) => {
  const [downloadName, setDownloadName] = React.useState(defaultName)
  const [customComment, setCustomComment] = React.useState('')
  const [shouldAddGenre, setShouldAddGenre] = React.useState(false)

  const startDownload = () => {
    createDownload(cartSongs, downloadName, customComment, shouldAddGenre)
    hideModal()
    displayNotice('Your tracks are being prepared. Check your downloads in a moment.')
  }

  return (
    <Modal isShowing={isShowingModal} hide={hideModal} headerContent={'Download settings'}>
      <p className="mb-1 mt-3">Download name</p>
      <input
        type="text"
        className="mb-3"
        value={downloadName}
        onChange={(event) => setDownloadName(event.target.value)}
      />
      <p className="mb-1 mt-3">Add custom note in metadata comment field</p>
      <input
        type="text"
        className="mb-3"
        value={customComment}
        onChange={(event) => setCustomComment(event.target.value)}
      />
      <p className="mb-1 mt-3">Add song genres in metadata comment field</p>
      <input
        type="checkbox"
        className="mb-3"
        checked={shouldAddGenre}
        onChange={(event) => setShouldAddGenre(event.target.checked)}
      />
      <Button width100 onClick={startDownload} bold blue>
        Start Download
      </Button>
    </Modal>
  )
}

const Cart = (props) => {
  const { removeAllSongsFromCart, createDownload, cartSongs, selectedPlaylist } = props
  const [collapsed, setCollapsed] = React.useState(true)

  const { isShowingModal, displayModal, hideModal } = useModal()

  const showSettingsModal = () => {
    if (cartSongs.length === 0) return

    displayModal()
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
            <Button onClick={() => removeAllSongsFromCart()} rounded>
              Remove all
            </Button>
            <Button onClick={showSettingsModal} bold blue>
              <i className="fas fa-shopping-cart btn-icon" /> Prepare download
            </Button>
          </div>
          <Separator />
          {cartSongs.map((song) => (
            <SongSmall key={song.id} details={song} />
          ))}
        </div>
      </div>
      {isShowingModal && (
        <SettingsModal
          hideModal={hideModal}
          createDownload={createDownload}
          isShowingModal={isShowingModal}
          defaultName={selectedPlaylist.name}
          cartSongs={cartSongs}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartSongs: state.cartSongs,
    selectedPlaylist: state.selectedPlaylist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAllSongsFromCart, createDownload }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
