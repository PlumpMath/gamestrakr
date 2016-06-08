import paginate from './paginate';
import { gamesActions } from '../actions';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

// Updates the pagination data for different actions.
const games = combineReducers({
  byType: paginate({
    mapActionToKey: action => action.gamesType,
    types: [
      gamesActions.GAMES_REQUEST,
      gamesActions.GAMES_SUCCESS,
      gamesActions.GAMES_FAILURE,
      gamesActions.GAMES_REMOVE,
    ],
  }),
  byId: (state = Map(), action) => {
    if (action.response && action.response.entities && action.response.entities.games) {
      return state.mergeDeep(action.response.entities.games);
    }

    return state;
  }
});

export default games;

