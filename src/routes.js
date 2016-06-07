import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import App from './containers/App';
import Library from './components/Library';
import GridContainer from './containers/GridContainer';
import Auth from './containers/Auth';
import GameDetails from './containers/Detail';

const routes = (<Route path="/" component={App}>
  <IndexRedirect to="/games/recent" />

  <Redirect from="/library" to="library/playing" />

  <Route path="library/:gamesType" components={{ main: GridContainer, subNav: Library }} />

  <Redirect from="/games" to="games/recent" />
  <Route path="games/:gamesType" components={{ main: GridContainer}} />

  <Route path="/game/:name" components={{ main: GameDetails }} />

  <Route path="/auth/:authType" components={{ main: Auth }} />
</Route>);

export default routes;
