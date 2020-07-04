import React, { Component } from 'react'

import { hasAccessToken } from '../helpers'

const handleNoToken = () => {
  if (hasAccessToken()) {
    return <p>You are already connected with Spotify</p>
  } else {
    return (
      <a className="btn btn-spotify" rel="nofollow" data-method="post" href="/auth/spotify">
        Connect with Spotify
      </a>
    )
  }
}

const PanelSettings = () => {
  return (
    <div className="settings">
      {window.totoProdReal()}
      <div className="section-settings">
        <h3>
          <i className="fas fa-unlock"></i> Account Management
        </h3>
        <a className="btn" rel="nofollow" data-method="delete" href="/users/sign_out">
          Sign out
        </a>
      </div>

      <div className="section-settings">
        <h3>
          <i className="fab fa-spotify"></i> Spotify connection
        </h3>
        {handleNoToken()}
      </div>
    </div>
  )
}

export default PanelSettings
