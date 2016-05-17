import React from 'react';
import {List} from 'immutable';
import {NavContainer} from './Nav';
import {LoginContainer} from './user/Login';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <NavContainer/>
          <LoginContainer/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});
