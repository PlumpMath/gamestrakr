import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';

import {gameActions} from '../../actions/';
import css from  '../../stylesheets/games_grid.scss';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    height: '100%',
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
    position: 'relative'
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

  itemsByPage: function(){
    const {items, page, itemsPerPage} = this.props;
    if (items && items.size > 0){
      const i = (itemsPerPage * page) || 0;
      const j = i + itemsPerPage;
      return items.slice(i, j);
    }
  },

  render(){
    const {isFetching} = this.props;
    const items = this.itemsByPage();
    var grid;

    if (items && items.size > 0){
      grid = (
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {items.map((item, i) => (
            <this.props.tile key={i} item={item}/>
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
        <div onTouchTap={this.props.prevPage} className="prev-page-ctr">
          <FontIcon color={'#fff'} className="material-icons">arrow_back</FontIcon>
          <span>Previous Page</span>
        </div>
        <div onTouchTap={this.props.nextPage} className="next-page-ctr">
          <span>Next Page</span>
          <FontIcon color={'#fff'} className="material-icons">arrow_forward</FontIcon>
        </div>
      </div>
    );

    return (
      <div style={styles.root}>
        <div style={styles.gridCtr}>
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
    page: state.gamesByType.getIn([ownProps.gamesType, 'page']),
    isFetching: state.gamesByType.getIn([ownProps.gamesType, 'isFetching']),
    itemsPerPage: state.app.get('itemsPerPage')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextPage: () => {
      dispatch(gameActions.requestNextPage(ownProps.gamesType));
    },
    prevPage: () => {
      dispatch(gameActions.requestPrevPage(ownProps.gamesType));
    }
  };
};

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid);

export default GridContainer;
