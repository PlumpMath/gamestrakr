import {Map, List, fromJS} from 'immutable';
import Cookies from 'js-cookie';

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

function requestUserGames(state){
  return state.setIn(['user', 'isFetching'], true);
}

function receiveUserGames(state, json){
	return state.setIn(['user', 'games'], fromJS(json.games));
}

function receiveUserGame(state, game){
	return state.updateIn(['user', 'games'], List(), arr => {
		const duplicate = arr.find((v, k) => { return v.get('name') === game.name});
		if(!duplicate) return arr.push(fromJS(game));
		else return arr;
	});
}

function receiveGames(state, gamesType, json){
	return state.setIn(['gamesByType', gamesType],
										 fromJS({items: json, isFetching: false}));
}

function receiveUser(state, token, name){
  Cookies.set('user', {token: token, name: name});
  return state.set('user', fromJS({token: token, name: name}));
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
    // USER
    case 'REQUEST_USER_GAMES':
      return requestUserGames(state)
    case 'RECEIVE_USER_GAMES':
      return receiveUserGames(state, action.json)
    case 'RECEIVE_USER':
      return receiveUser(state, action.token, action.name)
		case 'RECEIVE_USER_GAME':
      return receiveUserGame(state, action.game)
    return state;
  }
}

