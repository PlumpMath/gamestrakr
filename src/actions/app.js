export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const OPEN_LEFT_DRAWER = 'OPEN_LEFT_DRAWER'
export const CLOSE_LEFT_DRAWER = 'CLOSE_LEFT_DRAWER'
export const ITEMS_PER_PAGE = 'ITEMS_PER_PAGE'
export const SET_GRID_COLS = 'SET_GRID_COLS'

export const resetErrorMessage = () => ({type: RESET_ERROR_MESSAGE})

export const setErrorMessage = (error) => ({type: SET_ERROR_MESSAGE, error})

export const openLeftDrawer = () => ({type: OPEN_LEFT_DRAWER})

export const closeLeftDrawer = () => ({type: CLOSE_LEFT_DRAWER})

export const setItemsPerPage = (num) => ({ type: ITEMS_PER_PAGE, num })

export const setGridCols = (size) => ({ type: SET_GRID_COLS, size})
