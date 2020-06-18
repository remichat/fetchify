import React, { Component } from 'react'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setPlaylist, resetSelectedSongs, resetSongs } from '../actions'

const Playlist = ({ playlistDetails, resetSongs, setPlaylist, resetSelectedSongs, selectedPlaylist }) => {
  const handleClick = () => {
    resetSongs()
    setPlaylist(playlistDetails)
    resetSelectedSongs()
  }

  return (
    <span className={classNames({ active: selectedPlaylist.id === playlistDetails.id })} onClick={handleClick}>
      {playlistDetails.name}
    </span>
  )
}

const mapStateToProps = (state) => {
  return { selectedPlaylist: state.selectedPlaylist }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist, resetSelectedSongs, resetSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
