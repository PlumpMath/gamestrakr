import React from 'react'
import {render} from 'react-dom'
import {hashHistory} from 'react-router'
import {appActions, userActions} from './actions/'
import {fromJS} from 'immutable'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import css from './stylesheets/index.scss'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore(fromJS({
  app: {'leftDrawerOpen': false, 'itemsPerPage': 24},
}))

// Grab user from cookies if available, dispatch initial state
store.dispatch(userActions.userFromCookie())

render(
  <Root store={store} history={hashHistory} />,
  document.getElementById('app')
)

