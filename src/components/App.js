import React from 'react';
import {List} from 'immutable';
import {NavContainer} from './Nav';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="app-ctr">
          <NavContainer/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});
