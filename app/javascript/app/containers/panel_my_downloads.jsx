import React, { Component } from 'react';

import { connect } from 'react-redux';

import DownloadsLists from '../components/downloads_lists';

class PanelMyDownloads extends Component {
  render() {
    const style= {
     backgroundImage: `url(https://mosaic.scdn.co/300/10d79086d13664d7631a1a3dda4662286ffc2a30ab67616d0000b273b94203efb252305b712e3538ab67616d0000b273c709fcd1fa691104f7d9916fab67616d0000b273f81935f794c1112bbda4de81)`
    }
    return (
      <div id="my-downloads">
        <h2>Recent Downloads</h2>
          <div className="downloads-grid">

            <div className="download-card">

              <div className="download-cover" style={style}></div>

              <div className="download-info">
                <div className="info-top">
                  <span className="download-title">20190912_1</span>
                  <span className="download-size">432Mo 46h</span>
                </div>
                <div className="info-bottom">
                  <div className="songs-number">106 / 133 tracks found</div>
                  <div className="download-cta">
                    <i class="fas fa-cloud-download-alt"></i>
                    <span> Download</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        <h2>Past Downloads</h2>
      </div>
    );
  }
}

export default PanelMyDownloads;
