import React, { Component } from 'react';

import { connect } from 'react-redux';

import DownloadsLists from '../components/downloads_lists';

class PanelMyDownloads extends Component {
  render() {
    return (
      <div id="my-downloads">
        <h2>Recent Downloads</h2>
        <DownloadsLists />

        <h2>Past Downloads</h2>
        <DownloadsLists />
      </div>
    );
  }
}

export default PanelMyDownloads;

