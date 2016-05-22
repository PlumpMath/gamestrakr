import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

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
    overflowY: 'auto'
  },
  floatingBtn: {
    float: 'right',
    top: '-50%',
    translate: 'transformY(-50%)'
  }
};

const Grid = React.createClass({
  mixins: [PureRenderMixin],

  // itemsByPage(): function(){
  //   // get range calculated using num on page(16) and page number
  // },

  render(){
    const {items} = this.props;
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
        {grid}
        {bottomNav}
      </div>
    );
  }

});

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.gamesByType.getIn([ownProps.gamesType, 'page']),
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
