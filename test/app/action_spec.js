import {expect} from 'chai'
import { appActions } from '../../src/actions/'

describe('app actions', () => {
  it('should create an action to reset error message', () => {
    const expectedAction = {
      type: appActions.RESET_ERROR_MESSAGE,
    }
    expect(appActions.resetErrorMessage()).to.eql(expectedAction)
  })

  it('should create an action to set error message', () => {
    const error = "Example error text"
    const expectedAction = {
      type: appActions.SET_ERROR_MESSAGE,
      error
    }
    expect(appActions.setErrorMessage(error)).to.eql(expectedAction)
  })

  it('should create an action to open left drawer', () => {
    const expectedAction = {
      type: appActions.OPEN_LEFT_DRAWER
    }
    expect(appActions.openLeftDrawer()).to.eql(expectedAction)
  })

  it('should create an action to close left drawer', () => {
    const expectedAction = {
      type: appActions.CLOSE_LEFT_DRAWER
    }
    expect(appActions.closeLeftDrawer()).to.eql(expectedAction)
  })

  it('should create an action to set items per page', () => {
    const num = 10
    const expectedAction = {
      type: appActions.ITEMS_PER_PAGE,
      num
    }
    expect(appActions.setItemsPerPage(num)).to.eql(expectedAction)
  })

  it('should create an action to set grid cols', () => {
    const size = 800
    const expectedAction = {
      type: appActions.SET_GRID_COLS,
      size
    }
    expect(appActions.setGridCols(size)).to.eql(expectedAction)
  })
})

