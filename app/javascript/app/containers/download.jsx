import React, { Component } from 'react';

import { connect } from 'react-redux';

class Download extends Component {
  render() {
    const style= {
     backgroundImage: `url(https://mosaic.scdn.co/300/10d79086d13664d7631a1a3dda4662286ffc2a30ab67616d0000b273b94203efb252305b712e3538ab67616d0000b273c709fcd1fa691104f7d9916fab67616d0000b273f81935f794c1112bbda4de81)`
    }

    return (
      <div className="download-card">
          <div className="download-cover" style={style}>
            <div className="cover-gradient">
              <span className="songs-number"></span>
              <div className="download-cta">
                <i class="fas fa-cloud-download-alt"></i>
              </div>
              <span className="download-size">432 Mo</span>
            </div>
          </div>
        </div>
    );
  }
}

export default Download;
