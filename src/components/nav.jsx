import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import onClickOutside from 'react-onclickoutside';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react-redux';

import Loader from './Loader';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import * as actions from '../actions';
import css from '../stylesheets/nav.scss';

const styles = {
  toolbar: {
    backgroundColor: '#181818',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  icon: {
    color: '#fff'
  }
};

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

          // onLeftIconButtonTouchTap={this.props.toggleLeftDrawer}
  render() {
    return (
      <div className="nav-ctr">
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true} float={'left'}>
            <IconButton iconStyle={styles.icon}>
              <FontIcon className="material-icons">account_circle</FontIcon>
            </IconButton>
          </ToolbarGroup>

          <ToolbarGroup lastChild={true} float={'right'}>
            <IconMenu iconButtonElement={
              <IconButton iconStyle={styles.icon}>
                <FontIcon className="material-icons">account_circle</FontIcon>
              </IconButton>
              }>

              <MenuItem primaryText="Sign Up"/>
              <MenuItem primaryText="Sign Up"/>
              <MenuItem primaryText="Sign Up"/>
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>

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
