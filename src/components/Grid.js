import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {GridList} from 'material-ui/GridList'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import Tile from './Tile'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%'
  },
  gridList: {
    width: '100%',
    overflowY: 'auto',
    position: 'relative'
  },
  floatingBtn: {
    float: 'right',
    top: '-50%',
    translate: 'transformY(-50%)'
  },
  gridCtr: {
    width: '100%',
    overflowY: 'auto',
    position: 'relative',
    minHeight: '815px'
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0
  }
}

export default class Grid extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  renderLoadMore = () => {
    const { isFetching, onLoadMoreClick } = this.props

    return (
      <button style={{ fontSize: '150%' }}
        onClick={onLoadMoreClick}
        disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    )
  }

  render(){
    const {
      items, isFetching, gridCols, pageCount,
      nextPageUrl, saveGameByType
    } = this.props

    const isEmpty = items.length === 0
    if (isEmpty && isFetching) {
      return <div style={styles.loaderCtr}>
        <CircularProgress style={styles.loader} size={2} />
      </div>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div className="grid-root" style={styles.root}>
        <div className="grid-ctr" style={styles.gridCtr}>
          <GridList cellHeight={200} cols={gridCols || 6} style={styles.gridList}>
            {items.map((item, i) => <Tile key={i} item={item} saveGame={saveGameByType} />)}
          </GridList>
        </div>
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}
