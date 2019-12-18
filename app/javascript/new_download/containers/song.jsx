import React, { Component } from 'react';
import { connect } from 'react-redux';

class Song extends Component {
  render() {
    return (
      <div className="song-row">
        {this.props.details.name}
      </div>
    );
  }
}


export default Song;
