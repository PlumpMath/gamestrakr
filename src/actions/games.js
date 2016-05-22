const request = require('superagent-cache')();

export function requestGames(gamesType){
  return {
    type: 'REQUEST_GAMES',
		gamesType
  }
}

export function receiveGame(gamesType, game){
  return {
    type: 'RECEIVE_GAME',
    gamesType,
    game
  }
}

export function receiveGames(gamesType, json){
  return {
    type: 'RECEIVE_GAMES',
		gamesType,
    json,
    recievedAt: Date.now()
  }
}

export function setGamesType(gamesType){
  return {
    type: 'SET_GAMES_TYPE',
		gamesType
  }
}

export function fetchGames(state, gamesType, opts){
  const token = state.user.get('token');
  const page = state.gamesByType.getIn([gamesType, 'page']);

  return new Promise((resolve, reject) => {
    request
      .get(`${process.env.SERVER_URL}/games/${gamesType}`)
      .set('X-Access-Token', token)
      .query({limit: 16})
      .query({page: page})
      .end((err, res) => {
        if(err) reject(err);
        else return resolve(res);
      });
  });
}

export function saveGames(){
	return (dispatch, getState) => {
		const state = getState();
		const token = state.user.get('token');
    const games = state.games.getIn('user', 'items');
    if (token){
      request
        .post(`${process.env.SERVER_URL}/games/user`)
        .send({games: games})
        .set('X-Access-Token', token)
        .end((err, res) => {
          if(err) console.log('err', err);
        });
    }
  }
};

export function saveGame(name, imageUrl, giantBombUrl, status){
	const game = {name, imageUrl, giantBombUrl, status};
	return (dispatch, getState) => {
    dispatch(receiveGame('user', game));
		const state = getState();
		const token = state.user.get('token');
    if (token){
      request
        .post(`${process.env.SERVER_URL}/games/user`)
        .send({game: game})
        .set('X-Access-Token', token)
        .end((err, res) => {
          if(err) console.log('err', err);
        });
    }
  }
};

function shouldFetchGames(state, gamesType, opts) {
  if(gamesType === 'user' && !state.user.get('token')) return false;
  const numItemsPerPage = 16;
	const games = state.gamesByType.getIn([gamesType, 'items']);
	const isFetching = state.gamesByType.getIn([gamesType, 'isFetching']);
  const page = state.gamesByType.getIn([gamesType, 'page']);

	if (!games) return Promise.resolve();
  else if (games.size <= (page * numItemsPerPage)) return Promise.resolve();
  else if (isFetching) return Promise.reject();
}

export function fetchGamesIfNeeded(gamesType) {
  return (dispatch, getState) => {
    shouldFetchGames(getState(), gamesType, {})
      .then(() => dispatch(requestGames(gamesType)))
      .then(() => fetchGames(getState(), gamesType))
      .then((res) => dispatch(receiveGames(gamesType, res.body)));
  };
}

export function requestNextPage(gamesType){
  return (dispatch, getState) => {
    shouldFetchGames(getState(), gamesType, {nextPage: true})
      .then(() => dispatch(requestGames(gamesType)))
      .then(() => fetchGames(getState(), gamesType, {nextPage: true}))
      .then(() => disptach(setNextPage()))
    };
  }

export function setNextPage(gamesType){
  return {
    type: 'NEXT_PAGE',
    gamesType
  }
}

// export function prevPage(gamesType){
//   return {
//     type: 'PREV_PAGE',
//     gamesType
//   }
// }

