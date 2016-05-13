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

export function setCurrentPage(pageName){
  return {
    type: 'SET_CURRENT_PAGE',
    pageName
  }
}

export function requestGames(pageName){
  return {
    type: 'REQUEST_GAMES',
		pageName
  }
}

export function receiveGames(pageName, json){
  return {
    type: 'RECEIVE_GAMES',
		pageName,
    games: json,
    recievedAt: Date.now()
  }
}

export function fetchGames(pageName){
	return function(dispatch){
		dispatch(requestGames(pageName));

		return request
			.get(`${process.env.SERVER_URL}/games/${pageName}`)
			.end((req, res) => {
				dispatch(receiveGames(pageName, res.body));
			});
	}
}

function shouldFetchGames(state, pageName) {
	const games = state.getIn([pageName, 'games'])
	const isFetching = state.getIn([pageName, 'isFetching']);
	if (!games) {
		return true
	} else if (isFetching) {
		return false
	}
 // else {
		// return games.didInvalidate
	// }
}


export function fetchGamesIfNeeded(pageName) {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), pageName)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchGames(pageName))
    }
  }
}
