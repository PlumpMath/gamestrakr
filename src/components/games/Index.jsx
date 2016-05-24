import React from 'react';
import {connect} from 'react-redux';
import {List} from  'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Grid from './Grid';
import {gameActions} from '../../actions/';

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
    this.props.setGamesType(defaultGamesType);
    this.props.fetchGames(defaultGamesType);
  },

  setGamesType: function(e, k, v){
    e.preventDefault();
    this.props.setGamesType(v);
    this.props.fetchGames(v);
  },

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
        <Grid {...this.props} />
        {this.props.children}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  var gamesType = state.app.get('selectedGamesType') || defaultGamesType;

  return {
    gamesType: gamesType,
    items: state.gamesByType.getIn([gamesType, 'items'])
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

// Might use in future
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

