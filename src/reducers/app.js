import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function openLeftDrawer(state){
  return state.set('leftDrawerOpen', true);
}

function closeLeftDrawer(state){
  return state.set('leftDrawerOpen', false);
}

function openLoginDialog(state){
  return state.set('loginDialogOpen', true);
}

function closeLoginDialog(state){
  return state.set('loginDialogOpen', false);
}

function authFailed(state){
  return state.set('errors', 'Auth Failed');
}

function setGamesType(state, gamesType){
  return state.set('selectedGamesType', gamesType);
}

function setItemsPerPage(state, num){
  return state.set('itemsPerPage', num);
}

export default function app(state = Map(), action){
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'OPEN_LEFT_DRAWER':
      return openLeftDrawer(state);
    case 'CLOSE_LEFT_DRAWER':
      return closeLeftDrawer(state);
    case 'OPEN_LOGIN_DIALOG':
      return openLoginDialog(state);
    case 'CLOSE_LOGIN_DIALOG':
      return closeLoginDialog(state);
    case 'SET_GAMES_TYPE':
      return setGamesType(state, action.gamesType);
    case 'ITEMS_PER_PAGE':
      return setItemsPerPage(state, action.num);
    default:
      return state;
  }
}
