import { CALL_API, Schemas } from '../middleware/api'

export function requestGames(gamesType){
  return {
    type: 'REQUEST_GAMES',
		gamesType
  }
}

export function saveGame(gamesType, game){
  return {
    type: 'SAVE_GAME',
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

export function fetchGames(state, gamesType, page){
  const token = state.user.get('token');
  const itemsPerPage = state.app.get('itemsPerPage');

  return new Promise((resolve, reject) => {
    request
      .get(`${process.env.SERVER_URL}/games/${gamesType}`)
      .set('X-Access-Token', token)
      .query({limit: itemsPerPage})
      .query({page: page})
      .end((err, res) => {
        if(err) reject(err);
        else return resolve(res);
      });
  });
}

export function requestSaveGame(name, imageUrl, giantBombUrl, status){
	const game = {name, imageUrl, giantBombUrl, status};
	return (dispatch, getState) => {
    dispatch(saveGame(status, game));
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

const userGamesTypes= ['playing', 'planning', 'completed', 'onHold', 'dropped'];
function shouldFetchGames(state, gamesType, page) {
  if(userGamesTypes.includes(gamesType) && !state.user.get('token')) return Promise.reject("Shouldn't fetch games");
  const itemsPerPage = state.app.get('itemsPerPage');
	const games = state.gamesByType.getIn([gamesType, 'items']);
	const isFetching = state.gamesByType.getIn([gamesType, 'isFetching']);

  if (isFetching) return Promise.reject("Shouldn't fetch games");
	else if (!games || (games.size <= (page * itemsPerPage))) return Promise.resolve();
  return Promise.reject("Shouldn't fetch games");
}

function shouldSetPage(state, gamesType, page){
  const itemsPerPage = state.app.get('itemsPerPage');
  const currentPage = state.gamesByType.getIn([gamesType, 'page']);
	const games = state.gamesByType.getIn([gamesType, 'items']);

  if(currentPage == page || (games && (games.size < itemsPerPage)))
    return Promise.reject("Shouldn't set page");
  return Promise.resolve();
}


export function fetchGamesIfNeeded(gamesType) {
  return (dispatch, getState) => {
    shouldFetchGames(getState(), gamesType)
      .then(() => dispatch(requestGames(gamesType)))
      .then(() => fetchGames(getState(), gamesType))
      .then((res) => dispatch(receiveGames(gamesType, res.body)))
      .catch((err) => console.log(err));
  };
}

export function requestPage(page, gamesType){
  return (dispatch, getState) => {
    shouldSetPage(getState(), gamesType, page)
      .then(() => dispatch(setPage(getState(), gamesType, page)))
      .then(() => shouldFetchGames(getState(), gamesType, page))
      .then(() => dispatch(requestGames(gamesType)))
      .then(() => fetchGames(getState(), gamesType, page))
      .then((res) => dispatch(receiveGames(gamesType, res.body)))
      .catch((err) => console.log(err));
  };
}


export function setPage(state, gamesType, page){
  return {
    type: 'SET_PAGE',
    gamesType,
    page
  }
}

// export function saveGames(){
// 	return (dispatch, getState) => {
// 		const state = getState();
// 		const token = state.user.get('token');
//     const games = state.games.getIn('user', 'items');
//     if (token){
//       request
//         .post(`${process.env.SERVER_URL}/games/user`)
//         .send({games: games})
//         .set('X-Access-Token', token)
//         .end((err, res) => {
//           if(err) console.log('err', err);
//         });
//     }
//   }
// };
