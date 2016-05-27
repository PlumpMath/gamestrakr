import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch';

// Extracts the next page URL from API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
    if (!link) {
      return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
      return null
    }

    return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = process.env.SERVER_URL

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function getApi(endpoint, schema, token) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, {headers: {'X-Access-Token': token}})
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      )
    })
}

function postApi(endpoint, schema, token, body) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  if (!token) {
    return Promise.reject('No token for post request')
  }
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'X-Access-Token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)})
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      let camelizedJson = camelizeKeys(json)

      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
}

const gameSchema = new Schema('games', {
  idAttribute: game => game.name
})

export const Schemas = {
  GAME: gameSchema,
  GAME_ARRAY: arrayOf(gameSchema)
}


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, requestMethod, body = {}} = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const token = store.getState().getIn(['user', 'token'])
  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  switch (requestMethod) {
    case 'GET':
      return getApi(endpoint, schema, token).then(
        response => next(actionWith({
          response,
          type: successType
        })),
        error => next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        }))
      )
    case 'POST':
      return postApi(endpoint, schema, token, body).then(
        response => next(actionWith({
          response,
          type: successType
        })),
        error => next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        }))
      )
  }
}
