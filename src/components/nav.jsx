import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import onClickOutside from 'react-onclickoutside';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import * as actions from '../actions';
import css from '../stylesheets/nav.scss';

const Nav =  onClickOutside(React.createClass({
  mixins: [PureRenderMixin],

  handleClickOutside: function(e) {
    this.props.toggleLeftDrawer(false);
  },

  getDrawerItems: function(){
    return this.props.leftDrawerItems || [];
  },

  triggerRoute(route){
    hashHistory.push(route);
    this.props.toggleLeftDrawer();
  },

  render() {
    return (
      <div className="nav-ctr">
        <AppBar
          onLeftIconButtonTouchTap={this.props.toggleLeftDrawer}
          title={this.props.navTitle || ''}
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
            title={<Link to="home" style={{textDecoration: 'none', color: '#fff'}}>{this.props.appTitle}</Link>}
            onLeftIconButtonTouchTap={this.props.toggleLeftDrawer} />
          {this.getDrawerItems().map((item) => {
            return (
              <MenuItem
                key={item.get('name')}
                style={{color: 'black'}}
                onTouchTap={this.triggerRoute.bind(this, item.get('route'))}>
                {item.get('name')}
                </MenuItem>
                );
          })}
          </Drawer>
        </div>
    );
  }
}));

function mapStateToProps(state){
  return {
    appTitle: state.get('appTitle'),
    navTitle: state.get('navTitle'),
    leftDrawerOpen: state.get('leftDrawerOpen'),
    leftDrawerItems: state.get('leftDrawerItems')
  };
}

export const NavContainer = connect(
  mapStateToProps,
  actions
)(Nav);
