import { createSelector } from 'reselect';
import { Map, OrderedSet } from 'immutable';
import { libTypes } from '../constants';

const getGamesByTypeIds = (state, key) => (
  state.getIn(['pagination', 'gamesByType', key, 'ids'], OrderedSet())
);

const getGamesEntities = (state) => (
  state.getIn(['entities', 'games'], Map())
);

export const getGamesByType = createSelector(
  [getGamesByTypeIds, getGamesEntities],
  (ids, games) => (ids.map(id => games.get(id)))
);

export const getGamesPaginationByType = (state, key) => (
  state.getIn(['pagination', 'gamesByType', key], Map())
);

export const getGamesTypeById = (state, id) => (
  state.getIn(['pagination', 'gamesByType'])
  .filter((v, k) => libTypes.includes(k))
  .findKey((v) => v.hasIn(['ids', id]))
);

// export const getGameById = (state, id) => (
//   state.getIn(['games', id])
// );
