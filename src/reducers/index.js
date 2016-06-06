import { combineReducers } from 'redux-immutable';
import app from './app';
import entities from './entities';
import pagination, * as fromPagination from './pagination';
import user from './user';

const rootReducer = combineReducers({
  entities,
  pagination,
  app,
  user,
});

export default rootReducer;

export const getVisibleGamesByType = (state, key) => (
  fromPagination.getVisibleGamesByType(state, key)
);
