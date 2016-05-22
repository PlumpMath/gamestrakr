import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {connect} from 'react-redux';
import {gameActions} from '../../actions/';
import {List} from  'immutable';

import Grid from './Grid';
import Tile from './Tile';

const defaultGamesType = 'recent';
const styles = {
  toolbar: {
    width: '100%',
    backgroundColor: '#212121'
  }
};

const Index = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames(this.props.gamesType);
    this.props.fetchGames('user');
  },

  setGamesType: function(e, k, v){
    e.preventDefault();
    this.props.setGamesType(v);
    this.props.fetchGames(v);
  },

  // sortedItems: function(){
  //   const items = this.props.items;

  //   if (items){
  //     return items
  //       .sort((a, b) =>
  //         new Date(a.get('original_release_date')) < new Date(b.get('original_release_date')))
  //   } else {
  //     return List();
  //   }
  // },
  //

  render() {
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
      <div className="app-ctr">
        {toolbar}
        <Grid tile={Tile} items={this.props.items} gamesType={this.props.gamesType}/>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  var gamesType = state.app.get('selectedGamesType') || defaultGamesType;

  return {
    gamesType: gamesType,
    items: state.gamesByType.getIn([gamesType, 'items']),
    page: state.gamesByType.getIn([gamesType, 'page'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(gameActions.fetchGamesIfNeeded(gamesType));
    },
    setGamesType: (gamesType) => {
      dispatch(gameActions.setGamesType(gamesType));
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer
