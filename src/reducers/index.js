import { combineReducers } from 'redux-immutable';
import app from './app';
import entities, * as fromEntities from './entities';
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
  fromPagination.getVisibleGamesByType(state.get('pagination'), key)
);

export const getGamesPaginationByType = (state, key) => (
  fromPagination.getGamesPaginationByType(state.get('pagination'), key)
);

export const getGamesTypeById = (state, id) => (
  fromPagination.getGamesTypeById(state.get('pagination'), id)
);

export const getGameById = (state, id) => (
  fromEntities.getGameById(state.get('entities'), id)
);
