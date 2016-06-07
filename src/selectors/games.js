import { createSelector } from 'reselect';
import { Map, OrderedSet } from 'immutable';
import { libTypes } from '../constants';

const getGamesByTypeIds = (state, type) => (
  state.getIn(['pagination', 'gamesByType', type, 'ids'], OrderedSet())
);

const getGamesEntities = (state) => (
  state.getIn(['entities', 'games'], Map())
);

export const getGames = createSelector(
  [getGamesByTypeIds, getGamesEntities],
  (ids, games) => (ids.map(id => games.get(id)))
);

export const getPagination = (state, type) => (
  state.getIn(['pagination', 'gamesByType', type], Map())
);

export const getTypeById = (state, id) => (
  state.getIn(['pagination', 'gamesByType'], Map())
  .filter((v, k) => libTypes.includes(k))
  .findKey((v) => v.hasIn(['ids', id]))
);

export const getGameById = (state, id) => (
  state.getIn(['entities', 'games', id])
);

export const getIsFetching = (state, type) => (
  state.getIn(['pagination', 'gamesByType', 'isFetching', type], false)
);

export const getPageCount = (state, type) => (
  state.getIn(['pagination', 'gamesByType', type, 'pageCount'], 0)
);

export const getNextPageUrl = (state, type) => (
  state.getIn(['pagination', 'gamesByType', type, 'nextPageUrl'], `/games/${type}?`)
);

export const getErrorMessage = (state, type) => (
  state.getIn(['pagination', 'gamesByType', type, 'errorMessage'])
);
