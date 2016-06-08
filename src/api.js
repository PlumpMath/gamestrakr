import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
import { normalize } from 'normalizr';

const API_ROOT = process.env.SERVER_URL;

// Extracts the next page URL from API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
}

export function getApi(endpoint, schema, getState) {
  if (typeof endpoint == 'function') endpoint = endpoint(getState())
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const token = getState().getIn(['user', 'token']);

  return fetch(fullUrl, { headers: { 'X-Access-Token': token } })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response);

      return Promise.resolve(Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      ));
    });
}

export function postApi(endpoint, body, schema, getState) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const token = getState().getIn(['user', 'token']);
  if (!token) {
    return Promise.reject({ message: 'Must be signed in to save games to library' });
  }
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'X-Access-Token': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const camelizedJson = camelizeKeys(json);

      return Promise.resolve(normalize(camelizedJson, schema));
    });
}
