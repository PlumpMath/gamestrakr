const request = require('superagent-cache')();

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

export function setCurrentPage(pageName){
  return {
    type: 'SET_CURRENT_PAGE',
    pageName
  }
}

export function receiveUser(token, name){
  return {
    type: 'RECEIVE_USER',
    token,
    name
  }
}

export function authFailed(){
  return {
    type: 'AUTH_FAILED'
  }
}

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

export function receiveUserGame(game){
  return {
    type: 'RECEIVE_USER_GAME',
    game
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
  const games = state.getIn(['user', 'games']);
  const token = state.getIn(['user', 'token']);
	const isFetching = state.getIn(['user', 'isFetching']);

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
      const token = state.getIn(['user', 'token']);
      return dispatch(fetchUserGames(token));
    }
  }
}

export function addUserGame(name, imageUrl, giantBombUrl, status){
	const game = {name, imageUrl, giantBombUrl, status};
	return (dispatch, getState) => {
		const state = getState();
		const token = state.getIn(['user', 'token']);
		request
			.post(`${process.env.SERVER_URL}/user/games`)
			.send({game: game})
			.set('X-Access-Token', token)
			.end((err, res) => {
				if(err) console.log('err', err);
			});

			dispatch(receiveUserGame(game));
	}
};

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
	const games = state.getIn(['gamesByType', gamesType]);
	const isFetching = state.getIn(['gamesByType', gamesType, 'isFetching']);

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

