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
    type: 'OPEN_LOGIN_DIALOG'
  }
}

export function setCurrentPage(pageName){
  return {
    type: 'SET_CURRENT_PAGE',
    pageName
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

export function fetchGames(gamesType){
	return function(dispatch){
		dispatch(requestGames(gamesType));

		return request
			.get(`${process.env.SERVER_URL}/games`)
			.query({games_type: gamesType})
			// .query({index: index})
			.end((req, res) => {
				dispatch(receiveGames(gamesType, res.body));
			});
	}
}

function shouldFetchGames(state, gamesType) {
	const games = state.getIn(['gamesByType', gamesType])
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

