import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '../components/base/Button'

import { addAllSongsToSelected, removeAllSongsFromSelected, addSongsToCart } from '../actions'

class SongsSelector extends Component {
  addAllToSelection = () => {
    this.props.addAllSongsToSelected(this.props.songs)
  }

  removeAllFromSelection = () => {
    this.props.removeAllSongsFromSelected(this.props.songs)
  }

  addSongsToCart = () => {
    this.props.addSongsToCart(this.props.selectedSongs)
  }

  render() {
    return (
      <div className="songs-actions">
        <div id="songs-select">
          <Button onClick={this.addAllToSelection} rounded inline className="mx-2">
            Select all
          </Button>
          <Button onClick={this.removeAllFromSelection} rounded inline className="mx-2">
            Unselect all
          </Button>
        </div>
        <Button onClick={this.addSongsToCart} bold rounded>
          <i className="fas fa-plus" style={{ lineHeight: 0 }}></i> Add selection to cart
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addAllSongsToSelected,
      removeAllSongsFromSelected,
      addSongsToCart,
    },
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongs: state.selectedSongs,
    songs: state.songs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsSelector)
