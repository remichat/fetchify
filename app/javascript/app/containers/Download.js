import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { deleteDownload } from '../actions'

const Download = ({
  details: { id, name, size, number_of_tracks_ok, number_of_tracks_total, status, cover_url, download_url },
  ...props
}) => {
  const relaunchDownload = () => {
    const url = `/api/v1/current_user/downloads/${id}`
    const body = {
      status: 'ONGOING',
    }
    const params = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }

    fetch(url, params)
  }

  const destroyDownload = () => {
    if (!confirm('Do you really want to delete this download ?')) return

    const url = `/api/v1/current_user/downloads/${id}`
    const params = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    }

    fetch(url, params)
      .then(() => {
        props.deleteDownload(id)
      })
      .catch(() => alert('Oops, something went wrong :/'))
  }

  const renderCTA = () => {
    if (status === 'READY') {
      return (
        <a href={download_url} className="download-card-cta" target="_blank">
          <i className="fas fa-cloud-download-alt"></i>
        </a>
      )
    } else if (status === 'DELETED') {
      return (
        <span className="download-card-cta" onClick={relaunchDownload}>
          <i className="redo fas fa-redo-alt"></i>
        </span>
      )
    } else {
      return <p className="preparing">Preparing ...</p>
    }
  }

  const downloadSubDetails =
    status === 'READY'
      ? `${size} Mo | ${number_of_tracks_ok} / ${number_of_tracks_total} tracks`
      : `${number_of_tracks_ok} / ${number_of_tracks_total} tracks`

  return (
    <div className="download-card">
      <div className="download-cover" style={{ backgroundImage: `url(${cover_url})` }}>
        <div className="cover-gradient">
          <div className="top-card-infos">
            <i className="far fa-trash-alt m-3" onClick={destroyDownload} />
          </div>
          {renderCTA()}
          <div>
            <span className="download-name w-100">{name}</span>
            <span className="download-size w-100">{downloadSubDetails} tracks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteDownload }, dispatch)
}

export default connect(null, mapDispatchToProps)(Download)
