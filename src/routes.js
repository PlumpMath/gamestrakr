import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './components/App';
import GamesIndex from './components/games/Index';
import UserGamesIndex from './components/games/UserIndex';
import GamesDetail from './components/games/Detail';

import {appActions, userActions} from './actions/';

const routes = <Route path="/" component={App}>
 <IndexRedirect to="/games/recent" />

 <Route path="/my_games/:gamesType" component={UserGamesIndex}>
   <Route path=":name" component={GamesDetail}/>
 </Route>

 <Route path="/games/:gamesType" component={GamesIndex}>
   <Route path=":name" component={GamesDetail}/>
 </Route>

 <Route
   path="/auth_success"
   component={GamesIndex}
   onEnter={(nextState, replace) => {
     const {name, token} = queryString.parse(nextState.location.search);
       // store.disptach(uploadSavedGames());
     store.dispatch(userActions.userFromAuth(name, token));
   }}/>
 <Route
   path="/auth_failure"
   component={GamesIndex}
   onEnter={() => {
     store.dispatch(userActions.authFailed());
   }}/>
</Route>;

export default routes;
