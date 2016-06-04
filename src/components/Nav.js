import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

// Home - where users can view currently playing, their own collection, recently viewed etc
// Games - where users can search for and sort through upcoming and recently released games
// Platforms - where users can look through platforms

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { leftDrawerOpen, closeLeftDrawer, openLeftDrawer, user, navigate, signOut } = this.props;
    const signInButton = <MenuItem primaryText="Sign In" onTouchTap={() => navigate('/auth/login')} />;
    const signOutButton = <MenuItem primaryText="Sign Out" onTouchTap={signOut} />;
    const navLinks = [
      { name: 'Recent', route: 'games/recent', icon: 'videogame_asset' },
      { name: 'Upcoming', route: 'games/upcoming', icon: 'videogame_asset' },
      { name: 'Library', route: 'library', icon: 'videogame_asset' },
    ];

    const accountNavElement = (
      <IconMenu iconButtonElement={
        <IconButton>
          <FontIcon className="material-icons">account_circle</FontIcon>
        </IconButton>}
      >
        {user.get('token') ? signOutButton : signInButton}
      </IconMenu>
    );

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.props.openLeftDrawer}
          title={''}
          iconElementRight={accountNavElement}
        />

        <Drawer open={leftDrawerOpen}>
          <AppBar
            title={<Link to="/" style={{ textDecoration: 'none', color: '#000' }}>GamesTrakr</Link>}
            iconElementLeft={
              <IconButton
                onClick={closeLeftDrawer}
              >
                <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>}
          />

            {navLinks.map((item) => {
              return (
                <MenuItem key={item.name} onTouchTap={() => navigate(item.route)}>
                  {item.name}
                </MenuItem>
                );
            })}
          </Drawer>
        </div>
    );
  }
}

