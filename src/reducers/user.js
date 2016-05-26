import Cookies from 'js-cookie'
import {Map, fromJS} from 'immutable'
import {userActions} from '../actions'

function receiveUser(state, name, token){
  return state.merge(fromJS({name: name, token: token}))
}

function userFromCookie(state){
  return state.merge(userFromCookie)
}

function signOut(state){
  Cookies.remove('user')
  return state.delete('name').delete('token')
}

export default function(state = Map(), action) {
  switch (action.type) {
    case userActions.SIGN_OUT:
      return signOut(state)
    case userActions.RECEIVE_USER:
      return receiveUser(state, action.name, action.token)
    default:
      return state
  }
}

