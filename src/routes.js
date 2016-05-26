import React from 'react'
import {Route, IndexRedirect, Redirect} from 'react-router'
import App from './containers/App'
import User from './containers/User'
import GamesDetail from './components/games/Detail'
import GamesIndex from './components/games/Index'
import Login from './components/user/Login'
import AuthSucess from './components/user/AuthSucess'

import {appActions, userActions} from './actions/'

const routes = <Route path="/" component={App}>
 <IndexRedirect to="/games/recent" />

 <Redirect from="/my_games" to="my_games/playing"/>
 <Route path="/my_games/:gamesType" component={User}/>

 <Redirect from="/games" to="games/recent"/>
 <Route path="/games/:gamesType" component={GamesIndex}/>

 <Route path="/games/:name" component={GamesDetail}/>

 <Route path="/sign_in" component={Login}/>
 <Route path="/auth_success" component={AuthSucess}/>
 <Route path="/auth_failure" component={GamesIndex}/>
</Route>

export default routes
