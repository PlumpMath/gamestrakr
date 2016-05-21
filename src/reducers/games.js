import {Map, List, fromJS} from 'immutable';

function requestGames(state, gamesType){
  return state.setIn([gamesType, 'isFetching'], true);
}

function receiveGames(state, gamesType, json){
	return state.set(gamesType,
										 fromJS({items: json, isFetching: false}));
}

function receiveGame(state, gamesType, game){
	return state.updateIn([gamesType, 'items'], List(), arr => {
		const duplicate = arr.find((v, k) => { return v.get('name') === game.name});
		if(!duplicate) return arr.push(fromJS(game));
		else{
			const index = arr.indexOf(duplicate);
			return arr.set(index, fromJS(game));
		}
	});
	// return state.mergeIn([gamesType, 'items'], game);
}


export default function(state = Map(), action) {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return requestGames(state, action.gamesType);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.gamesType, action.json);
    case 'RECEIVE_GAME':
      return receiveGame(state, action.gamesType, action.game);
    case 'NEXT_PAGE':
      return nextPage(state, action.gamesType);
    default:
      return state;
  }
}
