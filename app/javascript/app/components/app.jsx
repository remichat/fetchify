import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { hasAccessToken } from '../helpers';
import displayNotice from '../../components/notice_popup';

import PanelSettings from './panel_settings';
import PanelNewDownload from '../containers/panel_new_download';
import PlaylistsList from '../containers/playlists_list';


class App extends React.Component {
  handleNoToken = () => {
    if (hasAccessToken()) {
      return <PanelNewDownload />
    } else {
      displayNotice("You need to log in with Spotify to continue");
      return <Redirect to="/settings" />
    }
  }

  render() {
    return (
      <Router>

        <Route exact path="/">
          <Redirect to="/downloads/new" />
        </Route>

        <div id="left-panel">

          <div id="logo">
            <i className="fas fa-paw mr-1"></i><h1>Fetchify</h1>
          </div>

          <ul id="menu" className="list">
            <Link to="/downloads/new">
              <li className="menu-item">
                <i className="fas fa-plus-circle mr-3"></i>
                <span>New download</span>
              </li>
            </Link>
            <Link to="/downloads">
              <li className="menu-item">
                <i className="fas fa-list mr-3"></i>
                <span>My downloads</span>
              </li>
            </Link>
          </ul>

          <Route path="/downloads/new">
            {hasAccessToken() ? <PlaylistsList /> : null}
          </Route>

        </div>
        <div id="right-panel">

          <div id="top-bar">
            <Link to="/settings">
              <div className="account">
                <span>Remi Chatenay</span>
              </div>
            </Link>
          </div>

          <Switch>
            <Route path="/settings">
              <PanelSettings />
            </Route>
            <Route path="/downloads/new">
            {this.handleNoToken}
            </Route>
          </Switch>

        </div>

      </Router>
    );
  }
}

export default App;


