// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import app from './app';
import gamesByType from './games';
import user from './user';

export default combineReducers({
  app,
  gamesByType,
  user
})
