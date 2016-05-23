export function setState(state){
  return {
    type: 'SET_STATE',
    state
  }
}

export function openLeftDrawer(){
  return {
    type: 'OPEN_LEFT_DRAWER'
  }
}

export function closeLeftDrawer(){
  return {
    type: 'CLOSE_LEFT_DRAWER'
  }
}

export function openLoginDialog(){
  return {
    type: 'OPEN_LOGIN_DIALOG'
  }
}

export function closeLoginDialog(){
  return {
    type: 'CLOSE_LOGIN_DIALOG'
  }
}

export function setItemsPerPage(num){
  return {
    type: 'ITEMS_PER_PAGE',
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
  };
}

export function setGridCols(cols){
  return {
    type: 'SET_GRID_COLS',
    cols
  }
}
