import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchDownloads } from '../actions';
import Download from './Download';

const DownloadsList = ({ downloads, header }) => {
  if(header !== "Available" && downloads.length === 0) return null

  return (
    <div>
      <h2>{header} downloads</h2>
      {header === "Available" && downloads.length === 0 && <><p>Start a new download on the New Download tab.</p></>}
      <div className="downloads-grid">
        {downloads
          .sort((dl_1, dl_2) => new Date(dl_2.created_date) - new Date(dl_1.created_date))
          .map(download => <Download key={download.id} details={download}/>)}
      </div>
    </div>
  )

}

const PanelMyDownloads = ({ downloads, fetchDownloads }) => {
  React.useEffect(() => {
    fetchDownloads()
  }, [])

  const pendingDownloads = downloads.filter(download => download.status === "ONGOING");
  const availableDownloads = downloads.filter(download => download.status === "READY");
  const deletedDownloads = downloads.filter(download => download.status === "DELETED");

  return (
    <div id="my-downloads">
      <DownloadsList downloads={pendingDownloads} header="Pending"/>
      <DownloadsList downloads={availableDownloads} header="Available"/>
      <DownloadsList downloads={deletedDownloads} header="Old"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    downloads: state.downloads
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchDownloads }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelMyDownloads);

