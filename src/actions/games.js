import { CALL_API, Schemas } from '../middleware/api'

export const GAMES_REQUEST = 'GAMES_REQUEST'
export const GAMES_SUCCESS = 'GAMES_SUCCESS'
export const GAMES_FAILURE = 'GAMES_FAILURE'

function gamesUrl(baseUrl){
  return (state) => {
    if (state){
      const itemsPerPage = state.getIn(['app', 'itemsPerPage'])
      return `${baseUrl}&limit=${itemsPerPage}`
    }

    return baseUrl
  }
}

// Fetches a page of games by a type.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchGames(gamesType, nextPageUrl) {
  return {
    gamesType,
    [CALL_API]: {
      types: [ GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE],
      endpoint: gamesUrl(nextPageUrl),
      requestMethod: 'GET',
      schema: Schemas.GAME_ARRAY
    }
  }
}

// Fetches a page of games by type.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadGamesByType(type, nextPage) {
  return (dispatch, getState) => {
    const nextPageUrl = getState().getIn(['pagination', 'gamesByType', type, 'nextPageUrl'], `/games/${type}?`)
    const pageCount = getState().getIn(['pagination', 'gamesByType', type, 'pageCount'], 0)

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchGames(type, nextPageUrl))
  }
}

function postGame(game, gamesType, postUrl) {
  return {
    gamesType,
    [CALL_API]: {
      types: [ GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE],
      endpoint: postUrl,
      requestMethod: 'POST',
      body: {game: game.toJS()},
      schema: Schemas.GAME_ARRAY
    }
  }
}

export function saveGameByType(game, gamesType) {
  return (dispatch, getState) => {
    if (!['name', 'image', 'apiDetailUrl'].every((k) => game.has(k))){
      return null
    }
    const postUrl = `games/${gamesType}`

    return dispatch(postGame(game, gamesType, postUrl))
  }
}
