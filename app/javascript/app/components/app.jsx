import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PanelSettings from './panel_settings';
import PanelNewDownload from '../containers/panel_new_download';
import PlaylistsList from '../containers/playlists_list';


class App extends React.Component {
  render() {
    return (
      <Router>
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
            <PlaylistsList />
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
            <PanelNewDownload />
          </Route>
        </Switch>
        </div>

      </Router>
    );
  }
}

export default App;


