import {Map, List, fromJS} from 'immutable';
import Cookies from 'js-cookie';

function requestUserGames(state){
  return state.setIn(['games', 'isFetching'], true);
}

function receiveUserGames(state, json){
	return state.set('games', fromJS({items: json.games, isFetching: false}));
}

function receiveUserGame(state, game){
	return state.updateIn(['games', 'items'], List(), arr => {
		const duplicate = arr.find((v, k) => { return v.get('name') === game.name});
		if(!duplicate) return arr.push(fromJS(game));
		else{
			const index = arr.indexOf(duplicate);
			return arr.set(index, fromJS(game));
		}
	});
}

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
    case 'REQUEST_USER_GAMES':
      return requestUserGames(state)
    case 'RECEIVE_USER_GAMES':
      return receiveUserGames(state, action.json)
    case 'SIGN_OUT':
      return signOut(state)
    case 'RECEIVE_USER':
      return receiveUser(state, action.token, action.name)
		case 'RECEIVE_USER_GAME':
      return receiveUserGame(state, action.game)
    case 'USER_FROM_COOKIE':
      return userFromCookie(state);
    default:
      return state;
  }
}

