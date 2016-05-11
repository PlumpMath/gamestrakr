export function setState(state){
  return {
    type: 'SET_STATE',
    state
  }
}

export function toggleLeftDrawer(){
  return {
    type: 'TOGGLE_LEFT_DRAWER'
  }
}
