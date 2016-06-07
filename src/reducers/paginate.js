import { Map, OrderedSet } from 'immutable';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 4) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType, removeType] = types;

  function updatePagination(state = Map({
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: OrderedSet(),
    errorMessage: null,
  }), action) {
    switch (action.type) {
      case requestType:
        return state.merge({
          isFetching: true,
          errorMessage: null,
        });
      case successType:
        return state.merge({
          isFetching: false,
          ids: state.get('ids').concat(action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.get('pageCount') + 1,
          errorMessage: null,
        });
      case failureType:
        return state.merge({
          isFetching: false,
          errorMessage: action.errorMessage,
        });
      default:
        return state;
    }
  }

  function removeFromPagination(state = Map({
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: OrderedSet(),
  }), action) {
    return state.update('ids', ids => ids.filterNot((id) => action.response.result.includes(id)));
  }

  return function updatePaginationByKey(state = Map(), action) {
    let key;

    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return state.merge({ [key]: updatePagination(state.get(key), action) });
      case removeType:
        key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return state.merge({
          [key]: removeFromPagination(state.get(key), action),
        });
      default:
        return state;
    }
  };
}
