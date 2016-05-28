import React, { Component, PropTypes } from 'react'
import Nav from '../components/Nav'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {appActions, userActions} from '../actions/'
import { Link } from 'react-router'

const darkMuiTheme = getMuiTheme(darkBaseTheme)
class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.props.windowResized(window.innerWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

	handleResize = (e) => {
    this.props.windowResized(window.innerWidth)
  }

  navigate = (route) => {
    this.context.router.push(route)
    this.props.closeLeftDrawer()
  }

  render() {
		const {main, subNav} = this.props
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <Nav {...this.props} className="nav-ctr" navigate={this.navigate} />
					{subNav}
          {main}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    leftDrawerOpen: state.getIn(['app', 'leftDrawerOpen']),
    user: state.get('user')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openLeftDrawer: () => {
      dispatch(appActions.openLeftDrawer())
    },
    closeLeftDrawer: () => {
      dispatch(appActions.closeLeftDrawer())
    },
    windowResized: (width) => {
      dispatch(appActions.windowResized(width))
    },
    signOut: () => {
      dispatch(userActions.signOut())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
