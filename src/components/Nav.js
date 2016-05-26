import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

// Home - where users can view currently playing, their own collection, recently viewed etc
// Games - where users can search for and sort through upcoming and recently released games
// Platforms - where users can look through platforms

const navLinks =  [{name: 'All Games', route: 'games', icon: 'videogame_asset'}, {name: 'My Games', route: 'my_games', icon: 'videogame_asset'}]

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {leftDrawerOpen, closeLeftDrawer, openLeftDrawer, navTitle, user, triggerRoute, signOut} = this.props
    const signInButton = <MenuItem primaryText='Sign In' onTouchTap={() => triggerRoute('/auth/login')}/>
    const signOutButton= <MenuItem primaryText='Sign Out' onTouchTap={signOut}/>

    const accountNavElement = (
      <IconMenu iconButtonElement={
        <IconButton>
          <FontIcon className="material-icons">account_circle</FontIcon>
        </IconButton>}>
        {user.get('token') ? signOutButton : signInButton}
      </IconMenu>
    )

    return(
      <div className="nav-ctr">
        <AppBar
          onLeftIconButtonTouchTap={this.props.openLeftDrawer}
          title={navTitle || ''}
          iconElementRight={accountNavElement}/>

        <Drawer open={leftDrawerOpen}>
          <AppBar
            title={<Link to="/" style={{textDecoration: 'none', color: '#000'}}>GamesTrakr</Link>}
            iconElementLeft={
              <IconButton
                onClick={closeLeftDrawer}>
                <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>}/>

            {navLinks.map((item) => {
              return (
                <MenuItem key={item.name} onTouchTap={() => triggerRoute(item.route)}>
                  {item.name}
                </MenuItem>
                )
            })}
          </Drawer>
        </div>
    )
  }
}

