import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'
import {Iterable} from 'immutable'
// import DevTools from '../containers/DevTools'

const logger= createLogger({
  stateTransformer: (state) => {
    let newState = {}

    for (var i of Object.keys(state.toJS())) {
      if (Iterable.isIterable(state.get(i))) {
        newState[i] = state.get(i).toJS()
      } else {
        newState[i] = state.get(i)
      }
    };
    return newState
  }
})

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, logger)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

