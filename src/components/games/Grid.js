import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';

import {gameActions} from '../../actions/';
import Tile from './tile';

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
};

const Grid = React.createClass({
  mixins: [PureRenderMixin],

  render(){
    const {items, isFetching} = this.props;
    var grid;

    if (items && items.size > 0){
      grid = (
        <GridList
          cellHeight={200}
          cols={this.props.gridCols || 6}
          style={styles.gridList}>

          {items.map((item, i) => (
            <Tile key={i} item={item} baseUrl={this.props.baseUrl}/>
          ))}

        </GridList>
      );
    }

    const loader = (
      <div style={styles.loaderCtr}>
        <CircularProgress style={styles.loader} size={2} />
      </div>
    );

    const bottomNav= (
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
    );

    return (
      <div className="grid-root" style={styles.root}>
        <div className="grid-ctr" style={styles.gridCtr}>
          {grid}
          {isFetching ? loader : ''}
        </div>
        {bottomNav}
      </div>
    );
  }

});

const mapStateToProps = (state, ownProps) => {
  return {
    itemsPerPage: state.getIn(['app', 'itemsPerPage']),
    gridCols: state.getIn(['app', 'gridCols'])
  };
};

const GridContainer = connect(mapStateToProps)(Grid);

export default GridContainer;
