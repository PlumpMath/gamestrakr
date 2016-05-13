import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import {hasIn} from 'lodash';

import GameTile from './GameTile';
import LoaderContainer from './Loader';

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

	getGames: function(){
		return this.props.games || [];
	},

  // componentDidUpdate: function(){
  //   if(this.props.isFetching){
  //     debugger;
  //   }
  // },

  render(){

    return (
      <div style={styles.root}>
        <LoaderContainer/>
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {this.getGames().map((game) => (
            <GameTile key={game.name} game={game}/>
          ))}

        </GridList>
      </div>
    );
  }

});

export default GameGrid;
