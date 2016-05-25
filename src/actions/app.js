export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const OPEN_LEFT_DRAWER = 'OPEN_LEFT_DRAWER'
export const CLOSE_LEFT_DRAWER = 'CLOSE_LEFT_DRAWER'
export const ITEMS_PER_PAGE = 'ITEMS_PER_PAGE'
export const SET_GRID_COLS = 'SET_GRID_COLS'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function openLeftDrawer(){
  return {
    type: OPEN_LEFT_DRAWER
  }
}

export function closeLeftDrawer(){
  return {
    type: CLOSE_LEFT_DRAWER
  }
}

export function setItemsPerPage(num){
  return {
    type: ITEMS_PER_PAGE,
    num
  }
}

export function windowResized(size){
  return (dispatch) => {
    switch (true){
      case (size < 800):
        return dispatch(setGridCols(2))
      case (size < 1000):
        return dispatch(setGridCols(3))
      case (size < 1500):
        return dispatch(setGridCols(4))
      default:
        return dispatch(setGridCols(6))
    }
  }
}

export function setGridCols(cols){
  return {
    type: SET_GRID_COLS,
    cols
  }
}
