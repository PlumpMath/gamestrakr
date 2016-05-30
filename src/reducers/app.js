import {Map} from 'immutable'
import {appActions} from '../actions'

function openLeftDrawer(state){
  return state.set('leftDrawerOpen', true)
}

function closeLeftDrawer(state){
  return state.set('leftDrawerOpen', false)
}

function setItemsPerPage(state, num){
  return state.set('itemsPerPage', num)
}

function setGridCols(state, cols){
  return state.set('gridCols', cols)
}

function resetErrorMessage(state){
  return state.set('errorMessage', null)
}

function setErrorMessage(state, error){
  return state.set('errorMessage', error)
}

export default function app(state = Map(), action){
  switch (action.type) {
    case appActions.OPEN_LEFT_DRAWER:
      return openLeftDrawer(state)
    case appActions.CLOSE_LEFT_DRAWER:
      return closeLeftDrawer(state)
    case appActions.ITEMS_PER_PAGE:
      return setItemsPerPage(state, action.num)
    case appActions.SET_GRID_COLS:
      return setGridCols(state, action.cols)
    case appActions.RESET_ERROR_MESSAGE:
      return resetErrorMessage(state)
    case appActions.SET_ERROR_MESSAGE:
      return setErrorMessage(state, action.error)
    default:
      return state
  }
}
