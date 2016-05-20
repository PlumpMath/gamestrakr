import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridList} from 'material-ui/GridList';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

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
  toolbar: {
    width: '100%',
    backgroundColor: '#212121'
  }
};

const Grid = React.createClass({
  mixins: [PureRenderMixin],

	getItems: function(){
		return this.props.items || [];
	},

  setGamesType: function(e, k, v){
    e.preventDefault();
    this.props.setGamesType(v);
    this.props.fetchGames(v);
  },

  render(){
    const toolbar = (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu onChange={this.setGamesType} value={this.props.gamesType}>
            <MenuItem value={'recent'} primaryText='Recent Releases'/>
            <MenuItem value={'upcoming'} primaryText='Upcoming Releases'/>
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );

    return (
      <div style={styles.root}>
        {toolbar}
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}>

          {this.getItems().map((item, i) => (
            <TileContainer key={`${item.get('name')}${i}`} item={item}/>
          ))}

        </GridList>
      </div>
    );
  }

});

export default Grid;
