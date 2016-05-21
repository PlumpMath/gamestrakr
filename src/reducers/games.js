import {Map, fromJS} from 'immutable';

function requestGames(state, gamesType){
  return state.setIn([gamesType, 'isFetching'], true);
}

function receiveGames(state, gamesType, json){
	return state.set(gamesType,
										 fromJS({items: json, isFetching: false}));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return requestGames(state, action.gamesType);
    case 'RECEIVE_GAMES':
      return receiveGames(state, action.gamesType, action.json);
    case 'NEXT_PAGE':
      return nextPage(state, action.gamesType);
    default:
      return state;
  }
}
