import {Map, fromJS} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function openLeftDrawer(state){
  return state.setIn(['ui', 'leftDrawerOpen'], true);
}

function closeLeftDrawer(state){
  return state.setIn(['ui', 'leftDrawerOpen'], false);
}

function openLoginDialog(state){
  return state.setIn(['ui', 'loginDialogOpen'], true);
}

function closeLoginDialog(state){
  return state.setIn(['ui', 'loginDialogOpen'], false);
}

function setCurrentPage(state, pageName){
  return state.set('currentPage', pageName);
}

function requestGames(state, gamesType){
  return state.setIn(['gamesByType', gamesType, 'isFetching'], true);
}

function receiveGames(state, gamesType, json){
	var newState = {gamesByType: {}};
 	newState.gamesByType[gamesType] = {items: json, isFetching: false};

	return state.merge(fromJS(newState));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);

    // UI
    case 'OPEN_LEFT_DRAWER':
      return openLeftDrawer(state);
    case 'CLOSE_LEFT_DRAWER':
      return closeLeftDrawer(state);
    case 'OPEN_LOGIN_DIALOG':
      return openLoginDialog(state);
    case 'CLOSE_LOGIN_DIALOG':
      return closeLoginDialog(state);
    case 'SET_CURRENT_PAGE':
      return setCurrentPage(state, action.pageName);

    // GAMES
    case 'REQUEST_GAMES':
      return requestGames(state, action.gamesType);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.gamesType, action.json);
  }

  return state;
}
