import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {appActions, userActions} from './actions/';

import configureStore from './store/configureStore'

import css from './stylesheets/index.scss';
import routes from './routes';

const store = configureStore()

// Grab user from cookies if available, dispatch initial state
store.dispatch(userActions.userFromCookie());
store.dispatch(appActions.closeLeftDrawer());
store.dispatch(appActions.setItemsPerPage(24));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

