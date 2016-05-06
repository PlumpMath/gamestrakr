import React from 'react';
import {List} from 'immutable';
import Nav from './Nav';
import LeftDrawer from './LeftDrawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
//Sales - possible section where users can submit and upvote sales
//Discussion - open forum discussion
const navItems = List.of('Home', 'Upcoming', 'Sales', 'Music', 'Discussion');
const appTitle = "GamerLyfe";
var leftDrawerOpen = false;

function toggleLeftDrawer(){
  leftDrawerOpen = !leftDrawerOpen;
};

export default React.createClass({
  getInitialState: function(){
    return {
      leftDrawerOpen: false
    };
  },

  toggleLeftDrawer: function(){
    this.setState({leftDrawerOpen: !this.state.leftDrawerOpen});
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Nav appTitle={appTitle} leftIconCB={this.toggleLeftDrawer} />
          <LeftDrawer open={this.state.leftDrawerOpen} navItems={navItems}/>
          {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
});
