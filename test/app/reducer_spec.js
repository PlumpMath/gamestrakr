import {fromJS} from 'immutable'
import {expect} from 'chai'
import { appActions } from '../../src/actions/'

import reducer from '../../src/reducers/app'

describe('app reducer', () => {

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.equal(fromJS({
      leftDrawerOpen: false,
      itemsPerPage: 24,
      gridCols: 6,
      errorMessage:null
    }))
  })

  it('handles OPEN_LEFT_DRAWER', () => {
    const initialState = reducer(undefined, {})
    const action = appActions.openLeftDrawer()
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      leftDrawerOpen: true,
      itemsPerPage: 24,
      gridCols: 6,
      errorMessage:null
    }))
  })


  it('handles CLOSE_LEFT_DRAWER', () => {
    const initialState = reducer(fromJS({leftDrawerOpen: true}), {})
    const action = appActions.closeLeftDrawer()
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      leftDrawerOpen: false
    }))
  })

  it('handles ITEMS_PER_PAGE', () => {
    const initialState = reducer(undefined, {})
    const action = appActions.setItemsPerPage(30)
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      leftDrawerOpen: false,
      itemsPerPage: 30,
      gridCols: 6,
      errorMessage:null
    }))
  })

  it('handles SET_GRID_COLS', () => {
    const initialState = reducer(undefined, {})
    const action = appActions.setGridCols(900)
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      leftDrawerOpen: false,
      itemsPerPage: 24,
      gridCols: 3,
      errorMessage:null
    }))
  })

  it('handles RESET_ERROR_MESSAGE', () => {
    const initialState = reducer(fromJS({errorMessage: 'Example error'}), {})
    const action = appActions.resetErrorMessage()
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      errorMessage: null
    }))
  })

  it('handles SET_ERROR_MESSAGE', () => {
    const initialState = reducer(undefined, {})
    const action = appActions.setErrorMessage('Example error')
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      leftDrawerOpen: false,
      itemsPerPage: 24,
      gridCols: 6,
      errorMessage: 'Example error'
    }))
  })

})

