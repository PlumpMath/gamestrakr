import React from 'react';
import {List} from 'immutable';
import {NavContainer} from './Nav';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <NavContainer />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});
