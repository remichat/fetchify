import React, { Component } from 'react';

import Download from '../containers/download';

const DownloadsList = (props) => {
  return (
    <div className="downloads-grid">
      {props.downloads.map(download => <Download key={download.id} details={download}/>)}
    </div>
  )
}

export default DownloadsList;
