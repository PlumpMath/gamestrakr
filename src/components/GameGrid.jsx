import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import {hasIn} from 'lodash';

import GameTile from './GameTile';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const GameGrid = React.createClass({
  mixins: [PureRenderMixin],

  render(){

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {this.props.games.map((game) => (
            <GameTile key={game.name} game={game}/>
          ))}

        </GridList>
      </div>
    );
  }

});

export default GameGrid;
