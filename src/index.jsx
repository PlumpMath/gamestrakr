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
import {setState, setCurrentPage} from './actions';

import css from './stylesheets/index.scss';

import App from './components/App';
import GamesIndex from './components/games/index';

import {Iterable} from 'immutable';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const loggerMiddleware = createLogger({
  stateTransformer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(setState({
	leftDrawerOpen: false,
}));

const routes = <Route path="/" component={App}>
  <Route
    path="/home"
    component={GamesIndex}
    onEnter={() => {store.dispatch(setCurrentPage('games'))}}/>
  <Route
    path="/games"
    component={GamesIndex}
    onEnter={() => {store.dispatch(setCurrentPage('games'))}}/>
  <Route
    path="/platforms"
    component={GamesIndex}
    onEnter={() => {store.dispatch(setCurrentPage('platforms'))}}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

