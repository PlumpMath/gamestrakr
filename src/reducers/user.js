import Cookies from 'js-cookie';
import {Map, List, fromJS} from 'immutable';

function receiveUser(state, name, token){
  return state.merge(fromJS({name: name, token: token}));
}

function userFromCookie(state){
  return state.merge(userFromCookie);
}

function signOut(state){
  Cookies.remove('user');
  return state.merge(fromJS({token: undefined, name: undefined, games: {}}));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SIGN_OUT':
      return signOut(state)
    case 'RECEIVE_USER':
      return receiveUser(state, action.name, action.token)
    default:
      return state;
  }
}

