import React from 'react';
import Nav from '../components/Nav';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="app-ctr">
          <Nav/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});
