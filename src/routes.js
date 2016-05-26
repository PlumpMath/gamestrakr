import React from 'react'
import {Route, IndexRedirect, Redirect} from 'react-router'
import App from './containers/App'
import User from './containers/User'
import Games from './containers/Games'
import Auth from './containers/Auth'
import GamesDetail from './components/Detail'

import {appActions, userActions} from './actions/'

const routes = <Route path="/" component={App}>
 <IndexRedirect to="/games/recent" />

 <Redirect from="/user" to="user/playing"/>
 <Route path="/user/:gamesType" component={User}/>

 <Redirect from="/games" to="games/recent"/>
 <Route path="/games/:gamesType" component={Games}/>

 <Route path="/games/:name" component={GamesDetail}/>

 <Route path="/auth/:authType" component={Auth}/>
</Route>

export default routes
