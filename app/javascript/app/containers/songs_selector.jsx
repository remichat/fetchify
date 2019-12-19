import React, { Component } from 'react';

class SongsSelector extends Component {
  render() {
    return (
      <div id="songs-actions">
        <div id="songs-select">
          <span id="select-all">Select all</span>
          <span id="unselect-all">Unselect all</span>
        </div>
        <span id="songs-add"><i className="fas fa-plus"></i> Add selection to cart</span>
      </div>
    );
  }
}

export default SongsSelector;
