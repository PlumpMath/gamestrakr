import Cookies from 'js-cookie';
const request = require('superagent-cache')();

// APP ACTIONS

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  }
}

export function openLeftDrawer(){
  return {
    type: 'OPEN_LEFT_DRAWER'
  }
}

export function closeLeftDrawer(){
  return {
    type: 'CLOSE_LEFT_DRAWER'
  }
}

export function openLoginDialog(){
  return {
    type: 'OPEN_LOGIN_DIALOG'
  }
}

export function closeLoginDialog(){
  return {
    type: 'CLOSE_LOGIN_DIALOG'
  }
}

// USER ACTIONS

export function receiveUser(name, token){
  return {
    type: 'RECEIVE_USER',
    name,
    token
  }
}

export function userFromCookie(){
  const user = Cookies.getJSON('user');

  return (dispatch, getState) => {
    if (user && user.name && user.token) {
      return dispatch(receiveUser(user.name, user.token));
    }
  }
}

export function userFromAuth(name, token){
  return (dispatch, getState) => {
    if (name && token) {
      Cookies.set('user', {name: name, token: token});
      return dispatch(receiveUser(name, token))
    }
  }
}

export function signOut(){
  return {
    type: 'SIGN_OUT'
  }
}

export function authFailed(){
  return {
    type: 'AUTH_FAILED'
  }
}

// GAMES ACTIONS


export function nextPage(gamesType){
  return {
    type: 'NEXT_PAGE',
    gamesType
  }
}

export function requestGames(gamesType){
  return {
    type: 'REQUEST_GAMES',
		gamesType
  }
}

export function receiveGame(gamesType, game){
  return {
    type: 'RECEIVE_GAME',
    gamesType,
    game
  }
}

export function receiveGames(gamesType, json){
  return {
    type: 'RECEIVE_GAMES',
		gamesType,
    json,
    recievedAt: Date.now()
  }
}

export function setGamesType(gamesType){
  return {
    type: 'SET_GAMES_TYPE',
		gamesType
  }
}

export function fetchGames(state, gamesType){
  const token = state.user.get('token');
	return function(dispatch){
		dispatch(requestGames(gamesType));

		return request
			.get(`${process.env.SERVER_URL}/games/${gamesType}`)
      .set('X-Access-Token', token)
			.query({limit: 16})
			.end((err, res) => {
        if(err) return false;
				else dispatch(receiveGames(gamesType, res.body));
			});
	}
}

export function saveGames(){
	return (dispatch, getState) => {
		const state = getState();
		const token = state.user.get('token');
    const games = state.games.getIn('user', 'items');
    if (token){
      request
        .post(`${process.env.SERVER_URL}/games/user`)
        .send({games: games})
        .set('X-Access-Token', token)
        .end((err, res) => {
          if(err) console.log('err', err);
        });
    }
  }
};

export function saveGame(name, imageUrl, giantBombUrl, status){
	const game = {name, imageUrl, giantBombUrl, status};
	return (dispatch, getState) => {
    dispatch(receiveGame('user', game));
		const state = getState();
		const token = state.user.get('token');
    if (token){
      request
        .post(`${process.env.SERVER_URL}/games/user`)
        .send({game: game})
        .set('X-Access-Token', token)
        .end((err, res) => {
          if(err) console.log('err', err);
        });
    }
  }
};

function shouldFetchGames(state, gamesType) {
	const games = state.gamesByType.getIn([gamesType, 'items']);
	const isFetching = state.gamesByType.getIn([gamesType, 'isFetching']);

  if(gamesType === 'user' && !state.user.get('token')) return false;

	if (!games) return true;
  else if (isFetching) return false;
}

export function fetchGamesIfNeeded(gamesType) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), gamesType)) {
      return dispatch(fetchGames(getState(), gamesType))
    }
  }
}

export function prevPage(gamesType){
  return {
    type: 'PREV_PAGE',
    gamesType
  }
}

export function nextPage(gamesType){
  return {
    type: 'NEXT_PAGE',
    gamesType
  }
}

