import { gamesActions } from '../actions';
import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import app from './app';
import user from './user';
import { Map } from 'immutable';

// Updates an entity cache in response to any action with response.entities.
function entities(state = Map({ games: {} }), action) {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities);
  }

  return state;
}

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

const rootReducer = combineReducers({
  entities,
  pagination,
  app,
  user,
});

export default rootReducer;
