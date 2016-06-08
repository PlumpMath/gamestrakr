import { createSelector } from 'reselect';
import { Map, OrderedSet } from 'immutable';
import { libTypes } from '../constants';

const getGamesByTypeIds = (state, type) => (
  state.getIn(['games', 'byType', type, 'ids'], OrderedSet())
);

const getGamesEntities = (state) => (
  state.getIn(['games', 'byId'], Map())
);

export const getGamesByType = createSelector(
  [getGamesByTypeIds, getGamesEntities],
  (ids, games) => {
    if (ids.size > 0){
      return ids.map(id => games.get(id))
    }
  }
);

export const getPagination = (state, type) => (
  state.getIn(['games', 'byType', type], Map())
);

export const getTypeById = (state, id) => (
  state.getIn(['games'], Map())
  .filter((v, k) => libTypes.includes(k))
  .findKey((v) => v.hasIn(['ids', id]))
);

export const getGameById = (state, id) => (
  state.getIn(['games', 'byId', id])
);

export const getIsFetching = (state, type) => (
  state.getIn(['games', 'byType', type, 'isFetching'])
);

export const getPageCount = (state, type) => (
  state.getIn(['games', 'byType', type, 'pageCount'], 0)
);

export const getNextPageUrl = (state, type) => (
  state.getIn(['games', 'byType', type, 'nextPageUrl'], `/games/${type}?`)
);

export const getErrorMessage = (state, type) => (
  state.getIn(['games', 'byType', type, 'errorMessage'])
);
