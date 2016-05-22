import {Map, List, fromJS} from 'immutable';

function requestGames(state, gamesType){
  return state.setIn([gamesType, 'isFetching'], true);
}

function receiveGames(state, gamesType, json){
  return state
    .updateIn([gamesType, 'items'], List(), items => items.concat(fromJS(json)))
    .setIn([gamesType, 'isFetching'], false);
}

function saveGame(state, gamesType, game){
	return state.updateIn([gamesType, 'items'], List(), arr => {
		const duplicate = arr.find((v, k) => { return v.get('name') === game.name});
		if(!duplicate) return arr.push(fromJS(game));
		else{
			const index = arr.indexOf(duplicate);
			return arr.set(index, fromJS(game));
		}
	});
}

function setPage(state, gamesType, page){
  return state.setIn([gamesType, 'page'], page);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return requestGames(state, action.gamesType);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.gamesType, action.json);
    case 'SAVE_GAME':
      return saveGame(state, action.gamesType, action.game);
    case 'SET_PAGE':
      return setPage(state, action.gamesType, action.page);
    default:
      return state;
  }
}
