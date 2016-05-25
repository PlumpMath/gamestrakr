import { CALL_API, Schemas } from '../middleware/api'

export const GAMES_REQUEST = 'GAMES_REQUEST'
export const GAMES_SUCCESS = 'GAMES_SUCCESS'
export const GAMES_FAILURE = 'GAMES_FAILURE'

// Fetches a page of games by a type.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchGames(gamesType, nextPageUrl) {
  return {
    gamesType,
    [CALL_API]: {
      types: [ GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.GAME_ARRAY
    }
  }
}

// Fetches a page of games by type.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadGamesByType(type, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `games/${type}`,
      pageCount = 0
    } = getState().getIn(['pagination', 'gamesByType', type]) || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchGames(type, nextPageUrl))
  }
}
