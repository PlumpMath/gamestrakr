import {Map, fromJS} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleLeftDrawer(state, open){
	const drawerOpen = (typeof(open) === "boolean")
		? open
		: !state.get('leftDrawerOpen');

  return state.set('leftDrawerOpen', drawerOpen);
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
    case 'TOGGLE_LEFT_DRAWER':
      return toggleLeftDrawer(state, action.open);
    case 'SET_CURRENT_PAGE':
      return setCurrentPage(state, action.pageName);
    case 'REQUEST_GAMES':
      return requestGames(state, action.gamesType);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.gamesType, action.json);
  }

  return state;
}
