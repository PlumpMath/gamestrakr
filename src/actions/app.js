export const OPEN_LEFT_DRAWER = 'OPEN_LEFT_DRAWER';
export const CLOSE_LEFT_DRAWER = 'CLOSE_LEFT_DRAWER';
export const ITEMS_PER_PAGE = 'ITEMS_PER_PAGE';
export const SET_GRID_COLS = 'SET_GRID_COLS';

export const openLeftDrawer = () => ({ type: OPEN_LEFT_DRAWER });

export const closeLeftDrawer = () => ({ type: CLOSE_LEFT_DRAWER });

export const setItemsPerPage = (num) => ({ type: ITEMS_PER_PAGE, num });

export const setGridCols = (size) => ({ type: SET_GRID_COLS, size });
