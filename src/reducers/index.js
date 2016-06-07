import { combineReducers } from 'redux-immutable';
import app from './app';
import entities from './entities';
import pagination from './pagination';
import user from './user';

const rootReducer = combineReducers({
  entities,
  pagination,
  app,
  user,
});

export default rootReducer;
