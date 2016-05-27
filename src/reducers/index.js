import {gamesActions, appActions} from '../actions'
import { combineReducers } from 'redux-immutable'
import paginate from './paginate'
import app from './app'
import user from './user'
import {Map} from 'immutable'

// Updates an entity cache in response to any action with response.entities.
function entities(state = Map({games: {}}), action) {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === appActions.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  gamesByType: paginate({
    mapActionToKey: action => action.gamesType,
    types: [
      gamesActions.GAMES_REQUEST,
      gamesActions.GAMES_SUCCESS,
      gamesActions.GAMES_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  app,
  user
})

export default rootReducer
