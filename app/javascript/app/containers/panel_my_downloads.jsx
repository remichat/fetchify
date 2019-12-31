import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDownloads } from '../actions';

import DownloadsLists from '../components/downloads_lists';

class PanelMyDownloads extends Component {
  componentDidMount() {
    this.props.fetchDownloads()
  }

  threshold = () => {
    const now = new Date();
    return new Date(now.getTime() - (24 * 3600 * 1000));
  }

  render() {
    return (
      <div id="my-downloads">
        <h2>Recent Downloads</h2>
        <DownloadsLists downloads={this.props.downloads.filter(download => new Date(download.created_date) > this.threshold())}/>
        <h2>Past Downloads</h2>
        <DownloadsLists downloads={this.props.downloads.filter(download => new Date(download.created_date) < this.threshold())}/>
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

