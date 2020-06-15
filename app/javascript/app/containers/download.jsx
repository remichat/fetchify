import React, { Component } from 'react';

const Download = ({ details: { 
  id,
  size,
  number_of_tracks_ok,
  number_of_tracks_total,
  status,
  cover_url,
  download_url } }) => {

  const relaunchDownload = () => {
    const url = `/api/v1/current_user/downloads/${id}`;
    const body = {
        status: "ONGOING"
      };
    const params = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    }

    fetch(url, params)
  }

  const renderCTA = () => {
    if (status === "READY") {
      return (
        <a href={download_url} className="download-card-cta" target="_blank">
          <i className="fas fa-cloud-download-alt"></i>
        </a>
      );
    } else if(status === "DELETED") {
      return (
        <span className="download-card-cta" onClick={relaunchDownload}>
          <i className="redo fas fa-redo-alt"></i>
        </span>
      );
    } else {
      return (
        <p className="preparing" >Preparing ...</p>
      );
    }
  }

  const downloadSubDetails = status === "READY" ? `${size} Mo | ${number_of_tracks_ok} / ${number_of_tracks_total} tracks`
    : `${number_of_tracks_ok} / ${number_of_tracks_total} tracks`


  return (
    <div className="download-card">
        <div className="download-cover" style={{backgroundImage: `url(${cover_url})`}}>
          <div className="cover-gradient">
            <span className="songs-number"></span>
            {renderCTA()}
            <span className="download-size">{downloadSubDetails} tracks</span>
          </div>
        </div>
      </div>
  );
}

export default Download;
