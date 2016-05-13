import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react-redux';

import Loader from './Loader';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

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
  },
  link: {
    margin: 0,
    height: '56px'
  },
  linkCtr: {
    alignItems: 'stretch'
  }
};


//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
const navLinks =  [{name: 'Home', route: 'home', icon: 'home'}, {name: 'Recent Releases', route: 'recent_releases', icon: 'videogame_asset'}, {name: 'Upcoming', route: 'upcoming_releases', icon: 'videogame_asset'}];

const Nav =  React.createClass({
  mixins: [PureRenderMixin],

  triggerRoute(route){
    hashHistory.push(route);
    this.props.toggleLeftDrawer();
  },

  render() {
    return (
      <div className="nav-ctr">
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={styles.linkCtr} firstChild={true} float={'left'}>
            {navLinks.map((link) => {
              return (
                <a href={`/#/${link.route}`} style={styles.link}>
                  <FontIcon className="material-icons" style={styles.icon}>{link.icon}</FontIcon>
                  {link.name}
                </a>
              );
            })}
          </ToolbarGroup>

          <ToolbarGroup>
            {this.props.isFetching ? <Loader/> : ''}
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
        </div>
    );
  }
});

function mapStateToProps(state){
  return {
    appTitle: state.get('appTitle'),
    navTitle: state.get('navTitle'),
    isFetching: state.getIn([state.get('currentPage'),'isFetching']),
    leftDrawerOpen: state.get('leftDrawerOpen'),
    leftDrawerItems: state.get('leftDrawerItems')
  };
}

export const NavContainer = connect(
  mapStateToProps,
  actions
)(Nav);
