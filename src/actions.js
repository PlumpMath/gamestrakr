const request = require('superagent-cache')();

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  }
}

export function toggleLeftDrawer(open){
  return {
    type: 'TOGGLE_LEFT_DRAWER',
    open
  }
}

export function setNavTitle(title){
  return {
    type: 'SET_NAV_TITLE',
    title
  }
}

export function requestGames(releaseType){
  return {
    type: 'REQUEST_GAMES',
		releaseType
  }
}

export function receiveGames(releaseType, json){
  return {
    type: 'RECEIVE_GAMES',
		releaseType,
    games: json,
    recievedAt: Date.now()
  }
}

export function fetchGames(releaseType){
	return function(dispatch){
		dispatch(requestGames(releaseType));

		return request
			.get(`${process.env.SERVER_URL}/games/${releaseType}`)
			.end((req, res) => {
				dispatch(receiveGames(releaseType, res.body));
			});
	}
}

function shouldFetchGames(state, releaseType) {
	const games = state.getIn([releaseType, 'games'])
	const isFetching = state.getIn([releaseType, 'isFetching']);
	if (!games) {
		return true
	} else if (isFetching) {
		return false
	}
 // else {
		// return games.didInvalidate
	// }
}


export function fetchGamesIfNeeded(releaseType) {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), releaseType)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchGames(releaseType))
    }
  }
}
