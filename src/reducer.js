import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleLeftDrawer(state){
  const drawerOpen = !state.get('leftDrawerOpen');
  return state.set('leftDrawerOpen', drawerOpen)
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_LEFT_DRAWER':
      return toggleLeftDrawer(state);
  }

  return state;
}
