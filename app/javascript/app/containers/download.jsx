import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Download extends Component {
  render() {
    const {cover_url, size, download_url, number_of_tracks} = this.props.details;

    const style= {
     backgroundImage: `url(${cover_url})`
    }

    return (
      <div className="download-card">
          <div className="download-cover" style={style}>
            <div className="cover-gradient">
              <span className="songs-number"></span>

              <a href={download_url} className="download-cta" target="_blank">
                <i className="fas fa-cloud-download-alt"></i>
              </a>

              <span className="download-size">{size} Mo | {number_of_tracks} tracks</span>
            </div>
          </div>
        </div>
    );
  }
}

export default Download;
