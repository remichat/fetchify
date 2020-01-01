import React, { Component } from 'react';

import Download from '../containers/download';

const DownloadsList = (props) => {
  return (
      <div className="downloads-grid">
        {props.downloads
          .sort((dl_1, dl_2) => new Date(dl_2.created_date) - new Date(dl_1.created_date))
          .map(download => <Download key={download.id} details={download}/>)}
      </div>
  )
}

export default DownloadsList;
