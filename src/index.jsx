import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import css from './stylesheets/index.scss';

import App from './components/App';
import Home from './components/Home';

const routes = <Route path="/" component={App}>
  <Route path="/home" component={Home} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

