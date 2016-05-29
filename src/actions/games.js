import { CALL_API, Schemas } from '../middleware/api'

export const GAMES_REQUEST = 'GAMES_REQUEST'
export const GAMES_SUCCESS = 'GAMES_SUCCESS'
export const GAMES_FAILURE = 'GAMES_FAILURE'
export const GAMES_REMOVE = 'GAMES_REMOVE'

export const GAME_REQUEST = 'GAME_REQUEST'
export const GAME_SUCCESS = 'GAME_SUCCESS'
export const GAME_FAILURE = 'GAME_FAILURE'

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

function fetchGame(name) {
  return {
    [CALL_API]: {
      types: [ GAME_REQUEST, GAME_SUCCESS, GAME_FAILURE],
      endpoint: `/games/by_name?name=${name}`,
      requestMethod: 'GET',
      schema: Schemas.GAME_ARRAY
    }
  }
}

export function loadGameByName(name) {
  return (dispatch, getState) => {
    // check if entities doesnt already contain game
    return dispatch(fetchGame(name))
  }
}

function postGame(game, gamesType, postUrl, currentLibType) {
  return {
    gamesType,
    [CALL_API]: {
      types: [ GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE, GAMES_REMOVE],
      endpoint: postUrl,
      requestMethod: 'POST',
      body: {game: game.toJS()},
      schema: Schemas.GAME_ARRAY,
			currentLibType
    }
  }
}

export function saveGameByType(game, gamesType) {
  return (dispatch, getState) => {
    if (!['name', 'image', 'apiDetailUrl'].every((k) => game.has(k))){
      return null
    }
    const postUrl = `/games/${gamesType}`
    const libTypes = ['playing', 'planning', 'completed', 'onHold', 'dropped']
		const currentLibType = getState().getIn(['pagination', 'gamesByType'])
			.filter((v, k) => libTypes.includes(k))
			.findKey((v, k) => v.hasIn(['ids', game.get('name')]))


    return dispatch(postGame(game, gamesType, postUrl, currentLibType))
  }
}
