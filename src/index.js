import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { userActions, gamesActions } from './actions/';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import css from './stylesheets/index.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

store.dispatch(userActions.userFromCookie());

const libTypes = ['playing', 'planning', 'completed', 'onHold', 'dropped'];
if (store.getState().getIn(['user', 'token'])) {
  libTypes.map((type) => store.dispatch(gamesActions.loadGamesByType(type)));
}

render(
  <Root store={store} history={hashHistory} />,
  document.getElementById('app')
);

