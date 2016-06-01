import {fromJS} from 'immutable'
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

function setGridCols(state, size){
  switch (true){
    case (size < 800):
      return state.set('gridCols', 2)
    case (size < 1000):
      return state.set('gridCols', 3)
    case (size < 1500):
      return state.set('gridCols', 4)
    default:
      return state.set('gridCols', 6)
  }
}

function resetErrorMessage(state){
  return state.set('errorMessage', null)
}

function setErrorMessage(state, error){
  return state.set('errorMessage', error)
}

export default function app(state = fromJS({
  leftDrawerOpen: false,
  itemsPerPage: 24,
  gridCols: 6,
  errorMessage: null
  }), action){
  switch (action.type) {
    case appActions.OPEN_LEFT_DRAWER:
      return openLeftDrawer(state)
    case appActions.CLOSE_LEFT_DRAWER:
      return closeLeftDrawer(state)
    case appActions.ITEMS_PER_PAGE:
      return setItemsPerPage(state, action.num)
    case appActions.SET_GRID_COLS:
      return setGridCols(state, action.size)
    case appActions.RESET_ERROR_MESSAGE:
      return resetErrorMessage(state)
    case appActions.SET_ERROR_MESSAGE:
      return setErrorMessage(state, action.error)
    default:
      return state
  }
}

