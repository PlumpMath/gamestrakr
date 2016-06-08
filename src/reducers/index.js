import { combineReducers } from 'redux-immutable';
import app from './app';
import games from './games';
import user from './user';

const rootReducer = combineReducers({
  games,
  app,
  user,
});

export default rootReducer;
