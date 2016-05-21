import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {openLeftDrawer, closeLeftDrawer, openLoginDialog, signOut} from '../actions';
import css from '../stylesheets/nav.scss';

// Home - where users can view currently playing, their own collection, recently viewed etc
// Games - where users can search for and sort through upcoming and recently released games
// Platforms - where users can look through platforms

const navLinks =  [{name: 'All Games', route: 'games', icon: 'videogame_asset'}, {name: 'My Games', route: 'my_games', icon: 'videogame_asset'}];

const Nav =  React.createClass({
	mixins: [PureRenderMixin],

	triggerRoute(route){
		hashHistory.push(route);
		this.props.closeLeftDrawer();
	},

	render() {
    const {leftDrawerOpen, navTitle, user} = this.props;
    const signUpButton = (<MenuItem primaryText='Sign In' onTouchTap={this.props.openLoginDialog}/>);
    const signOutButton= (<MenuItem primaryText='Sign Out' onTouchTap={this.props.signOut}/>);

    const accountNavElement = (
      <IconMenu iconButtonElement={
        <IconButton>
          <FontIcon className="material-icons">account_circle</FontIcon>
        </IconButton>}>
        {user.get('token') ? signOutButton : signUpButton}
      </IconMenu>
    );

    return(
      <div className="nav-ctr">
				<AppBar onLeftIconButtonTouchTap={this.props.openLeftDrawer} title={navTitle || ''} iconElementRight={accountNavElement}/>
        <Drawer open={leftDrawerOpen}>
          <AppBar
            title={<Link to="home" style={{textDecoration: 'none', color: '#fff'}}>{this.props.appTitle}</Link>}
            iconElementLeft={<IconButton onClick={this.props.closeLeftDrawer}><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}/>
            {navLinks.map((item) => {
              return (
                <MenuItem key={item.name} onTouchTap={this.triggerRoute.bind(this, item.route)}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Drawer>
      </div>
		);
	}
});

function mapStateToProps(state){
  return {
    leftDrawerOpen: state.app.get('leftDrawerOpen'),
    navTitle: state.app.get(['app', 'currentPage']),
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openLeftDrawer: () => {
      dispatch(openLeftDrawer());
    },
    closeLeftDrawer: () => {
      dispatch(closeLeftDrawer());
    },
    openLoginDialog: () => {
      dispatch(openLoginDialog());
    },
    signOut: () => {
      dispatch(signOut());
    }
  };
}

export const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
