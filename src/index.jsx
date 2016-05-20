import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import queryString from 'query-string';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Cookies from 'js-cookie';

import reducer from './reducer';
import {setState, setCurrentPage, receiveUser, authFailed} from './actions';

import css from './stylesheets/index.scss';

import App from './components/App';
import GamesIndex from './components/games/Index';
import UserGamesIndex from './components/user_games/Index';

import {Iterable, fromJS} from 'immutable';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

if (process.env.NODE_ENV === 'production'){
	var store = createStore(
		reducer,
		applyMiddleware(thunkMiddleware)
	);
} else {
	const loggerMiddleware = createLogger({
		stateTransformer,
		collapsed: true
	});
	// Initiate Redux store with logger and thunk middlewares
	var store = createStore(
		reducer,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);
}

// Grab user from cookies if available, dispatch initial state
const userFromCookie = fromJS(Cookies.getJSON('user'));
store.dispatch(setState({
  ui: {leftDrawerOpen: false, loginDialogOpen: false},
  user: userFromCookie
}));

const routes = <Route path="/" component={App}>
 <IndexRoute component={GamesIndex}/>
  <Route
    path="/my_games"
    component={UserGamesIndex}
    onEnter={() => {store.dispatch(setCurrentPage('games'))}}/>
  <Route
    path="/games"
    component={GamesIndex}
    onEnter={() => {store.dispatch(setCurrentPage('games'))}}/>
  <Route
    path="/auth_success"
    component={GamesIndex}
    onEnter={(nextState, replace) => {
      const {token, name} = queryString.parse(nextState.location.search);
      store.dispatch(receiveUser(token, name));
    }}/>
  <Route
    path="/auth_failure"
    component={GamesIndex}
    onEnter={() => {
      store.dispatch(authFailed());
    }}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

