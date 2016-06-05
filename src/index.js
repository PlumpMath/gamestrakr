import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { userActions } from './actions/';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './stylesheets/index.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();
store.dispatch(userActions.userFromCookie());

render(
  <Root store={store} history={hashHistory} />,
  document.getElementById('app')
);

