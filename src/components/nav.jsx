import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as actionCreators from '../action_creators';

import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
// TODO: Render recently viewed list of games underneath here in nav
// TODO: Add on click handler to body/document that emits redux action to close this drawer

const Nav = React.createClass({
  mixins: [PureRenderMixin],

  getDrawerItems: function(){
    return this.props.leftDrawerItems || [];
  },

  render: function() {
    return (
      <div className="nav-ctr">
        <AppBar
          title={<Link to="/home">{this.props.appTitle}</Link>}
          onLeftIconButtonTouchTap={this.props.toggleLeftDrawer} />
        <Drawer open={this.props.leftDrawerOpen}>
          {this.getDrawerItems().map((item) => {
            return <MenuItem style={{color: 'black'}}  key={item}>{item}</MenuItem>;
          })}
          </Drawer>
      </div>
    );
  }
});

function mapStateToProps(state){
  return {
    appTitle: state.get('appTitle'),
    leftDrawerOpen: state.get('leftDrawerOpen'),
    leftDrawerItems: state.get('leftDrawerItems')
  };
}

export const NavContainer = connect(
  mapStateToProps,
  actionCreators
)(Nav);
