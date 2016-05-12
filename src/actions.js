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

export function requestGames(params){
  return {
    type: 'REQUEST_GAMES',
    params
  }
}

export function receiveGames(params, json){
  return {
    type: 'RECEIVE_GAMES',
    params,
    games: json,
    recievedAt: Date.now()
  }
}

export function setNavTitle(title){
  return {
    type: 'SET_NAV_TITLE',
    title
  }
}

export function fetchGames(params){
  return function(dispatch){
    dispatch(requestGames(params));
    const page = params.page || '';

    return request
      .get(`${process.env.SERVER_URL}/games/${page}`)
      .end((req, res) => {
        dispatch(receiveGames(params, res.body))
      });
  }
}
