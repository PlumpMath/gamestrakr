import Cookies from 'js-cookie';

export const RECEIVE_USER = 'RECEIVE_USER';
export const SIGN_OUT = 'SIGN_OUT';

export const receiveUser = (name, token) => ({
  type: RECEIVE_USER,
  name,
  token,
});

export const userFromCookie = () => {
  const user = Cookies.getJSON('user');

  return (dispatch) => {
    if (user && user.name && user.token) {
      return dispatch(receiveUser(user.name, user.token));
    }

    return undefined;
  };
};

export const userFromAuth = (name, token) => {
  return (dispatch) => {
    if (name && token) {
      Cookies.set('user', { name, token });
      return dispatch(receiveUser(name, token));
    }

    return undefined;
  };
};

export const signOut = () => ({
  type: SIGN_OUT,
});
