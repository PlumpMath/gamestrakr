import {Map, fromJS} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleLeftDrawer(state, open){
	const drawerOpen = (typeof(open) === "boolean")
		? open
		: !state.get('leftDrawerOpen');

  return state.set('leftDrawerOpen', drawerOpen)
}

function setCurrentPage(state, pageName){
  return state.set('currentPage', pageName);
}

function requestGames(state, pageName){
  return state.setIn([pageName, 'isFetching'], true);
}

function receiveGames(state, pageName, games){
  return state.set(pageName, fromJS({games: games, isFetching: false}));
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
      return requestGames(state, action.pageName);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.pageName, action.games);
  }

  return state;
}
