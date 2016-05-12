import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import {setState, setNavTitle} from './actions';

import css from './stylesheets/index.scss';

import App from './components/App';
import {RecentReleasesContainer} from './components/RecentReleases';
import {UpcomingReleasesContainer} from './components/UpcomingReleases';

const loggerMiddleware = createLogger({collapsed: true});
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(setState({
  games: [],
  leftDrawerOpen: false,
  leftDrawerItems: [{name: 'Home', route: 'home'}, {name: 'Recent Releases', route: 'recent_releases'}, {name: 'Upcoming', route: 'upcoming_releases'}],
  appTitle: 'GamerLyfe'
}));

const routes = <Route path="/" component={App}>
  <Route path="/recent_releases" component={RecentReleasesContainer} onEnter={() => {store.dispatch(setNavTitle('Recent Releases'))}}/>
  <Route path="/upcoming_releases" component={UpcomingReleasesContainer} onEnter={() => {store.dispatch(setNavTitle('Upcoming Releases'))}}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

