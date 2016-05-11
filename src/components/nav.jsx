import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import * as actionCreators from '../action_creators';
import css from '../stylesheets/nav.scss';

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
// TODO: Render recently viewed list of games underneath here in nav

const Nav =  onClickOutside(React.createClass({
  mixins: [PureRenderMixin],

  handleClickOutside: function(e) {
    this.props.toggleLeftDrawer();
  },

  getDrawerItems: function(){
    return this.props.leftDrawerItems || [];
  },

  render() {
    return (
      <div className="nav-ctr">
        <AppBar
          onLeftIconButtonTouchTap={this.props.toggleLeftDrawer}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <FontIcon className="material-icons">account_circle</FontIcon>
                </IconButton>
                }>
                <MenuItem primaryText="Sign Up"/>
                <MenuItem primaryText="Sign Up"/>
                <MenuItem primaryText="Sign Up"/>
              </IconMenu>
              }/>
        <Drawer open={this.props.leftDrawerOpen}>
          <AppBar
            title={<Link to="/home" style={{textDecoration: 'none', color: 'black'}}>{this.props.appTitle}</Link>}
            onLeftIconButtonTouchTap={this.props.toggleLeftDrawer} />
          {this.getDrawerItems().map((item) => {
            return <MenuItem style={{color: 'black'}}  key={item}>{item}</MenuItem>;
          })}
          </Drawer>
        </div>
    );
  }
}));

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
