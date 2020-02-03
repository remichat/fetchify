import React, { Component } from 'react';

class Download extends Component {
  relaunchDownload() {
    console.log('tt');
  }

  renderSize() {
    const {size, number_of_tracks_ok, number_of_tracks_total, status} = this.props.details;

    if (status === "READY") {
      return <span className="download-size">{size} Mo | {number_of_tracks_ok} / {number_of_tracks_total} tracks</span>;
    }else {
      return <span className="download-size">{number_of_tracks_ok} / {number_of_tracks_total} tracks</span>;
    }
  }

  renderCTA() {
    const {download_url, number_of_tracks_ok, number_of_tracks_total, status} = this.props.details;

    if (status === "READY") {
      return (
        <a href={download_url} className="download-card-cta" target="_blank">
          <i className="fas fa-cloud-download-alt"></i>
        </a>
      );
    } else if(status === "DELETED") {
      return (
        <span className="download-card-cta" onClick={this.relaunchDownload}>
          <i className="redo fas fa-redo-alt"></i>
        </span>
      );
    } else {
      return (
        <p className="preparing" >Preparing ...</p>
      );
    }
  }


  render() {
    const style= {
     backgroundImage: `url(${this.props.details.cover_url})`
    }

    return (
      <div className="download-card">
          <div className="download-cover" style={style}>
            <div className="cover-gradient">
              <span className="songs-number"></span>

              {this.renderCTA()}
              {this.renderSize()}
            </div>
          </div>
        </div>
    );
  }
}

export default Download;
