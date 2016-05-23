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

import reducer from './reducers';
import {appActions, userActions} from './actions/';

import css from './stylesheets/index.scss';

import App from './components/App';
import GamesIndex from './components/games/Index';
import UserGamesIndex from './components/user_games/Index';

import {Iterable, fromJS} from 'immutable';

if (process.env.NODE_ENV === 'production'){
	var store = createStore(
		reducer,
		applyMiddleware(thunkMiddleware)
	);
} else {
  const loggerMiddleware = createLogger({
    stateTransformer: (state) => {
      let newState = {};

      for (var i of Object.keys(state)) {
        if (Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      };
      return newState;
    }
  });

	// Initiate Redux store with logger and thunk middlewares
	var store = createStore(
		reducer,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);
}

// Grab user from cookies if available, dispatch initial state
store.dispatch(userActions.userFromCookie());
store.dispatch(appActions.closeLeftDrawer());
store.dispatch(appActions.setItemsPerPage(42));

const routes = <Route path="/" component={App}>
 <IndexRoute component={GamesIndex}/>
  <Route
    path="/my_games"
    component={UserGamesIndex} />
  <Route
    path="/games"
    component={GamesIndex} />
  <Route
    path="/auth_success"
    component={GamesIndex}
    onEnter={(nextState, replace) => {
      const {name, token} = queryString.parse(nextState.location.search);
      // store.disptach(uploadSavedGames());
      store.dispatch(userActions.userFromAuth(name, token));
    }}/>
  <Route
    path="/auth_failure"
    component={GamesIndex}
    onEnter={() => {
      store.dispatch(userActions.authFailed());
    }}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

