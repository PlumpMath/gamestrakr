import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {GridList} from 'material-ui/GridList'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import Tile from './tile'

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

  render(){
    const {items, isFetching, gridCols} = this.props
    var grid

    if (items && items.size > 0){
      grid = (
        <GridList
          cellHeight={200}
          cols={gridCols || 6}
          style={styles.gridList}>

          {items.map((item, i) => (
            <Tile key={i} item={item} />
            ))}

          </GridList>
      )
    }

    const loader = (
      <div style={styles.loaderCtr}>
        <CircularProgress style={styles.loader} size={2} />
      </div>
    )

    return (
      <div className="grid-root" style={styles.root}>
        <div className="grid-ctr" style={styles.gridCtr}>
          {grid}
          {isFetching ? loader : ''}
        </div>
        <div className="bottom-nav">
          <div className="prev-page-ctr">
            <FontIcon color={'#fff'} className="material-icons">arrow_back</FontIcon>
            <span>Previous Page</span>
          </div>
          <div className="next-page-ctr">
            <span>Next Page</span>
            <FontIcon color={'#fff'} className="material-icons">arrow_forward</FontIcon>
          </div>
        </div>
      </div>
    )
  }
}

