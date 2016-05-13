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

import {toggleLeftDrawer} from '../actions';
import css from '../stylesheets/nav.scss';

// Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
const navLinks =  [{name: 'Home', route: 'home', icon: 'home'}, {name: 'Recent Releases', route: 'recent_releases', icon: 'videogame_asset'}, {name: 'Upcoming', route: 'upcoming_releases', icon: 'videogame_asset'}];

const Nav =  React.createClass({
	mixins: [PureRenderMixin],

	triggerRoute(route){
		hashHistory.push(route);
		this.props.toggleLeftDrawer();
	},

	clickHandler(){
		debugger;
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
								iconElementLeft={<IconButton onClick={this.props.toggleLeftDrawer} ><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>} />
								{
									navLinks.map((item) => {
										return (
											<MenuItem
											key={item.name}
											style={{color: 'black'}}
											onTouchTap={this.triggerRoute.bind(this, item.route)}>
											{item.name}
											</MenuItem>
										);
									})
								}
						</Drawer>
					</div>
		);
	}
});
							// <ToolBarGroup firstChild={true}>
							// {navLinks.map((item) => {
							// 	return (
							// 		<MenuItem
							// 		key={item.get('name')}
							// 		style={{color: 'black'}}
							// 		onTouchTap={this.triggerRoute.bind(this, item.get('route'))}>
							// 		{item.get('name')}
							// 		</MenuItem>
							// 	);
							// })}
							// </ToolBarGroup>

function mapStateToProps(state){
  return {
    leftDrawerOpen: state.get('leftDrawerOpen')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeftDrawer: () => {
      dispatch(toggleLeftDrawer());
    }
  };
}

export const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
