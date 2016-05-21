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

export function receiveUser(token, name){
  return {
    type: 'RECEIVE_USER',
    token,
    name
  }
}

export function userFromCookie(){
  return {
    type: 'USER_FROM_COOKIE'
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

// USER ACTIONS

export function requestUserGames(){
  return {
    type: 'REQUEST_USER_GAMES'
  }
}

export function receiveUserGames(json){
  return {
    type: 'RECEIVE_USER_GAMES',
    json
  }
}

export function fetchUserGames(token){
	return function(dispatch){
		dispatch(requestUserGames());
		return request
			.get(`${process.env.SERVER_URL}/user/games`)
      .set('X-Access-Token', token)
			.end((req, res) => {
				dispatch(receiveUserGames(res.body));
			});
	}
}

function shouldFetchUserGames(state){
  const games = state.user.get('games');
  const token = state.user.get('token');
	const isFetching = state.user.getIn(['games', 'isFetching']);

  if(token && !games) {
    return true;
  } else if(isFetching){
    return false;
  }
}

export function fetchUserGamesIfNeeded(){
  return (dispatch, getState) => {
    const state = getState();

    if(shouldFetchUserGames(state)) {
      const token = state.user.get('token');
      return dispatch(fetchUserGames(token));
    }
  }
}

export function addUserGame(name, imageUrl, giantBombUrl, status){
	const game = {name, imageUrl, giantBombUrl, status};
	return (dispatch, getState) => {
    dispatch(receiveGame('user', game));
		const state = getState();
		const token = state.user.get('token');
    if (token){
      request
        .post(`${process.env.SERVER_URL}/user/games`)
        .send({game: game})
        .set('X-Access-Token', token)
        .end((err, res) => {
          if(err) console.log('err', err);
        });

    }
  }
};


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

export function fetchGames(gamesType){
	return function(dispatch){
		dispatch(requestGames(gamesType));

		return request
			.get(`${process.env.SERVER_URL}/games`)
			.query({games_type: gamesType})
			.query({limit: 16})
			.end((req, res) => {
				dispatch(receiveGames(gamesType, res.body));
			});
	}
}

function shouldFetchGames(state, gamesType) {
	const games = state.gamesByType.getIn([gamesType, 'items']);
	const isFetching = state.gamesByType.getIn([gamesType, 'isFetching']);

	if (!games) {
		return true;
	} else if (isFetching) {
		return false;
	}
}

export function fetchGamesIfNeeded(gamesType) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), gamesType)) {
      return dispatch(fetchGames(gamesType))
    }
  }
}

