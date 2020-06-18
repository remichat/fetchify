import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SongLarge from './SongLarge'
import SongsSelector from './SongsSelector'
import Separator from '../components/base/Separator'

import { fetchSongs } from '../actions'

class PlaylistSongs extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.selectedPlaylist !== prevProps.selectedPlaylist) {
      this.props.fetchSongs(this.props.selectedPlaylist.id)
    }
  }

  renderSongsPanel() {
    const { songs } = this.props

    if (songs.length > 0) return songs.map((song) => <SongLarge key={song.id} details={song} />)

    return (
      <div className="loader-gif-container">
        <img src={require('../../../assets/images/loading_spinner.gif')} className="loader-gif" alt="loading gif" />
      </div>
    )
  }

  render() {
    return (
      <div className="songs-list">
        <SongsSelector />
        <Separator />
        <div className="songs-panel">{this.renderSongsPanel()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    selectedPlaylist: state.selectedPlaylist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSongs)
