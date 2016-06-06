import paginate from './paginate';
import { gamesActions } from '../actions';
import { combineReducers } from 'redux-immutable';

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
  state.getIn(['gamesByType', key, 'ids']).map(id => state.getIn(['entities', 'games']).get(id))
);

export const getGamesPaginationByType = (state, key) => (
  state.getIn(['gamesByType', key]).filter((v, k) => k !== 'ids').toJS()
);

export const getGamesTypeById = (state, key) => (
    return this.props.gamesByType
    .filter((v, k) => types.includes(k))
    .findKey((v) => v.hasIn(['ids', name]));
);
