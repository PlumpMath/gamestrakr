import schemas from './schema';
import * as api from './api';
import { libTypes } from '../constants';
import { gamesSelectors } from '../selectors';

export const GAMES_REQUEST = 'GAMES_REQUEST';
export const GAMES_SUCCESS = 'GAMES_SUCCESS';
export const GAMES_FAILURE = 'GAMES_FAILURE';
export const GAMES_REMOVE = 'GAMES_REMOVE';
export const GAME_SUCCESS = 'GAME_SUCCESS';

const gamesUrl = (baseUrl) => state => {
  if (state) {
    const itemsPerPage = state.getIn(['app', 'itemsPerPage']);
    return `${baseUrl}&limit=${itemsPerPage}`;
  }

  return baseUrl;
};

// Fetches a page of games by type.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export const loadGamesByType = (type, nextPage) => (dispatch, getState) => {
  let nextPageUrl = gamesSelectors.getNextPageUrl(getState(), type);
  const pageCount = gamesSelectors.getPageCount(getState(), type);
  const isFetching = gamesSelectors.getIsFetching(getState(), type);

  if (isFetching || (pageCount > 0 && !nextPage)) {
    return null;
  }
  dispatch({
    type: GAMES_REQUEST,
    gamesType: type
  });

  api.getApi(gamesUrl(nextPageUrl), schemas.GAME_ARRAY, getState).then(
    response => dispatch({
    type: GAMES_SUCCESS,
    gamesType: type,
    response,
  }),
  response => dispatch({
    type: GAMES_FAILURE,
    gamesType: type,
    response,
  }));
};

const fetchGame = (name) => ({
    endpoint: `/games/by_name?name=${name}`,
    schema: Schemas.GAME_ARRAY,
});

export const loadGameByName = (name) => (dispatch, getState) => {
  // check if entities doesnt already contain game
  if (gamesSelectors.getGameById(getState(), name)){
    return null;
  }

  api.getApi(`/games/by_name?name=${name}`, schemas.GAME_ARRAY, getState).then(
    response => dispatch({ type: GAME_SUCCESS, response }));
};

const postGame = (game, gamesType, postUrl) => ({
  gamesType,
  [CALL_API]: {
    types: [GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE, GAMES_REMOVE],
    endpoint: postUrl,
    requestMethod: 'POST',
    body: { game: game.toJS() },
    schema: Schemas.GAME_ARRAY,
  },
});

const saveGame = (game, gamesType) => (dispatch, getState) => {
  const currentLibType = gamesSelectors.getTypeById(getState(), game.get('name'));

  if (typeof currentLibType === 'string') {
    dispatch({
      gamesType: currentLibType,
      type: GAMES_REMOVE,
      response: {result: [game.get('name')]}
    });
  }

  dispatch({
    gamesType,
    type: GAMES_SUCCESS,
    response: {result: [game.get('name')]}
  });

  return Promise.resolve();
};

export const saveGameByType = (game, gamesType) => (dispatch, getState) => {
  if (!['name', 'image', 'apiDetailUrl'].every((k) => game.has(k))) {
    return null;
  }
  const postUrl = `/games/${gamesType}`;
  dispatch(saveGame(game, gamesType));

  if(getState().getIn(['user', 'token'])) dispatch(postGame(game, gamesType, postUrl));

  return Promise.resolve();
};

