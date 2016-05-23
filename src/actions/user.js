import Cookies from 'js-cookie';

export function receiveUser(name, token){
  return {
    type: 'RECEIVE_USER',
    name,
    token
  }
}

export function userFromCookie(){
  const user = Cookies.getJSON('user');

  return (dispatch, getState) => {
    if (user && user.name && user.token) {
      return dispatch(receiveUser(user.name, user.token));
    }
  }
}

export function userFromAuth(name, token){
  return (dispatch, getState) => {
    if (name && token) {
      Cookies.set('user', {name: name, token: token});
      return dispatch(receiveUser(name, token))
    }
  }
}

export function signOut(){
  return {
    type: 'SIGN_OUT'
  }
}

export function authFailed(){
  return {
    type: 'AUTH_FAILED'
  }
}

