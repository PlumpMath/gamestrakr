import paginate from './paginate';
import { gamesActions } from '../actions';
import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import { libTypes } from '../constants';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  gamesByType: paginate({
    mapActionToKey: action => action.gamesType,
    types: [
      gamesActions.GAMES_REQUEST,
      gamesActions.GAMES_SUCCESS,
      gamesActions.GAMES_FAILURE,
      gamesActions.GAMES_REMOVE,
    ],
  }),
});

export default pagination;


export const getVisibleGamesByType = (state, key) => (
  state.getIn(['gamesByType', key, 'ids'], List())
  .map(id => state.getIn(['entities', 'games']).get(id))
);

export const getGamesPaginationByType = (state, key) => (
  state.getIn(['gamesByType', key], Map())
);

export const getGamesTypeById = (state, id) => (
  state.get('gamesByType')
  .filter((v, k) => libTypes.includes(k))
  .findKey((v) => v.hasIn(['ids', id]))
);
