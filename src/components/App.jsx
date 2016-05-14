import React from 'react';
import {List} from 'immutable';
import {NavContainer} from './Nav';
import {LoginContainer} from './user/Login';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <NavContainer/>
          <LoginContainer/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});
