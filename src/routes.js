import React from 'react'
import {Route, IndexRedirect, Redirect} from 'react-router'
import App from './containers/App'
import Library from './containers/Library'
import Games from './containers/Games'
import Auth from './containers/Auth'
import Grid from './components/Grid'
import GamesDetail from './components/Detail'

import {appActions, userActions} from './actions/'

const routes = <Route path="/" component={App}>
 <IndexRedirect to="/games/recent" />

 <Redirect from="/library" to="library/playing"/>
 <Route path="library" component={Library}>
   <Route path=":gamesType" component={Grid}/>
 </Route>

 <Redirect from="/games" to="games/recent"/>
 <Route path="games" component={Games}>
   <Route path=":gamesType" component={Grid}/>
 </Route>

 <Route path="/game/:name" component={GamesDetail}/>

 <Route path="/auth/:authType" component={Auth}/>
</Route>

export default routes
