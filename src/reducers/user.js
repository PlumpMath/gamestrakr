import {Map, List, fromJS} from 'immutable';
import Cookies from 'js-cookie';

function receiveUser(state, token, name){
  Cookies.set('user', {token: token, name: name});
  return state.merge(fromJS({token: token, name: name}));
}

function userFromCookie(state){
  const userFromCookie = fromJS(Cookies.getJSON('user'));
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
      return receiveUser(state, action.token, action.name)
    case 'USER_FROM_COOKIE':
      return userFromCookie(state);
    default:
      return state;
  }
}

