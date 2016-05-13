// TODO: Enable users to add games to currently playing, completed, saved
// TODO: Enable users to rank games
// TODO: Render recently viewed list of games underneath here in nav
// TODO: Disable Redux logger in prod
// TODO: Make upcoming and recent release pages one page/component(toggleable)
// TODO: Make fetching of games more customizeable(ui options plug into actions and reducers)
// TODO: Add QA ui for each game
// TODO: Add platforms

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

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
store.dispatch(setState({
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

