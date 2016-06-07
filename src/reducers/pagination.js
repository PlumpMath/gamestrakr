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

