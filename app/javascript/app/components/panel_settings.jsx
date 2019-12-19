import React, { Component } from 'react';

const PanelSettings = () => {
  return (
    <div className="settings">
      <div className="section-settings">
        <h3><i className="fas fa-unlock"></i> Password change</h3>
        <p>Work in Progress</p>
      </div>

      <div className="section-settings">
        <h3><i className="fab fa-spotify"></i> Spotify connection</h3>
        <a className="btn btn-spotify" rel="nofollow" data-method="post" href="/auth/spotify">Connect with Spotify</a>
      </div>
    </div>
  )
}


export default PanelSettings;
