import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';

import TileContainer from './Tile';

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
    marginBottom: 24,
  },
};

const Grid = React.createClass({
  mixins: [PureRenderMixin],

	getItems: function(){
    return this.props.items || [];
	},

  render(){

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {this.getItems().map((item, i) => (
            <TileContainer key={i} item={item}/>
          ))}

        </GridList>
      </div>
    );
  }

});

const mapStateToProps = (state, ownProps) => {
  if (state.gamesByType.hasIn(['user', 'items'])){
    return {
      items: state.gamesByType.getIn(['user', 'items']).filter((item) => {
        return item.get('status') === ownProps.status;
      })
    };
  } else {
    return {items: []};
  }
};

const GridContainer = connect(mapStateToProps)(Grid);

export default GridContainer;
