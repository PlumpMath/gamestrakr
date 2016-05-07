import React from 'react';
import {List} from 'immutable';
import Nav from './Nav';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
// TODO: Render recently viewed list of games underneath here in nav
const navItems = List.of('Home', 'Upcoming');
const appTitle = "GamerLyfe";

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <Nav navItems={navItems} appTitle={appTitle} leftIconCB={this.toggleLeftDrawer} />
          {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
});
