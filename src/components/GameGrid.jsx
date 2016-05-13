import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import {hasIn} from 'lodash';

import GameTile from './GameTile';

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

const GameGrid = React.createClass({
  mixins: [PureRenderMixin],

	getGames: function(){
		return this.props.games || [];
	},

  render(){

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {this.getGames().map((game, i) => (
            <GameTile key={`${game.get('name')}${i}`} game={game}/>
          ))}

        </GridList>
      </div>
    );
  }

});

export default GameGrid;
