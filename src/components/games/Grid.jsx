import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';

import Tile from './Tile';

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
            <Tile key={`${item.get('name')}${i}`} item={item}/>
          ))}

        </GridList>
      </div>
    );
  }

});

export default Grid;
