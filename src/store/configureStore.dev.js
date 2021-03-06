import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { Iterable } from 'immutable';
import DevTools from '../containers/DevTools';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    for (const i of Object.keys(state.toJS())) {
      if (Iterable.isIterable(state.get(i))) {
        newState[i] = state.get(i).toJS();
      } else {
        newState[i] = state.get(i);
      }
    }
    return newState;
  },
});

const enhancer = compose(
  applyMiddleware(thunk, logger),
  DevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/* .default if you use Babel 6+ */)
    );
  }

  return store;
}
