import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDownloads } from '../actions';

import DownloadsLists from '../components/downloads_lists';

class PanelMyDownloads extends Component {
  componentDidMount() {
    this.props.fetchDownloads()
  }

  renderPendingDownloads = () => {
    const downloads = this.props.downloads.filter(download => download.status !== "READY");

    if (downloads.length === 0) {
      return null;
    } else {
      return (
        <div>
          <h2>Pending Downloads</h2>
          <DownloadsLists downloads={downloads}/>
        </div>
      );
    }

  }

  renderAvailableDownloads = () => {

    const downloads = this.props.downloads.filter(download => download.status === "READY");

    if (downloads.length === 0) {
      return (
        <div>
          <h2>Available Downloads</h2>
          <p>Start a new download on the New Download tab.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Available Downloads</h2>
          <DownloadsLists downloads={downloads}/>
        </div>
      );
    }

    return (
      <div>
        <h2>Available Downloads</h2>
        <DownloadsLists downloads={this.props.downloads.filter(download => download.status === "READY")}/>
      </div>
    );
  }

  render() {
    return (
      <div id="my-downloads">
        {this.renderPendingDownloads()}
        {this.renderAvailableDownloads()}
      </div>
    );
  }
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

