import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';

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

    return (
      <div style={styles.root}>
        {grid}
      </div>
    );
  }

});

export default Grid;
