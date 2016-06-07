import React, { Component, PropTypes } from 'react';
import Nav from '../components/Nav';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { appActions, userActions } from '../actions/';

const darkMuiTheme = getMuiTheme(darkBaseTheme);
class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.props.setGridCols(window.innerWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.props.setGridCols(window.innerWidth);
  }

  navigate = (route) => {
    this.context.router.push(route);
    this.props.closeLeftDrawer();
  }

  render() {
    const { main, subNav } = this.props;
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <Nav className="nav-ctr" {...this.props} navigate={this.navigate} />
					{subNav}
          {main}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  setGridCols: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  closeLeftDrawer: PropTypes.func.isRequired,
  main: PropTypes.node.isRequired,
  subNav: PropTypes.node,
};

function mapStateToProps(state) {
  return {
    leftDrawerOpen: state.getIn(['app', 'leftDrawerOpen']),
    user: state.get('user'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  openLeftDrawer() {
    dispatch(appActions.openLeftDrawer());
  },
  closeLeftDrawer() {
    dispatch(appActions.closeLeftDrawer());
  },
  setGridCols(width) {
    dispatch(appActions.setGridCols(width));
  },
  signOut() {
    dispatch(userActions.signOut());
  },
  resetErrorMessage() {
    dispatch(appActions.resetErrorMessage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
