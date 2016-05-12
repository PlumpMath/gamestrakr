import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleLeftDrawer(state, open){
  const drawerOpen = (typeof(open) === "boolean") ?
    open :
    !state.get('leftDrawerOpen');

  return state.set('leftDrawerOpen', drawerOpen)
}

function requestGames(state){
  return state.set('isFetching', true);
}

function receiveGames(state, games){
  return state.set('games', true);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_LEFT_DRAWER':
      return toggleLeftDrawer(state, action.open);
    case 'REQUEST_GAMES':
      return requestGames(state);
    case 'RECEIVE_GAMES':
      return receiveGames(state, games);
  }

  return state;
}
