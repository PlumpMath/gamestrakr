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
    games: json.data.games,
    recievedAt: Date.now()
  }
}
