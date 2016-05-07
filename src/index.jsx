import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

import css from './stylesheets/index.scss';

import App from './components/App';
import {HomeContainer} from './components/Home';


const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer);

store.dispatch(setState({
  games: ['Overwatch', 'Bloodborne'],
  leftDrawerOpen: false,
  leftDrawerItems: ['Home', 'Upcoming'],
  appTitle: 'GamerLyfe'
}));

const routes = <Route path="/" component={App}>
  <Route path="/home" component={HomeContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

