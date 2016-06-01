import React, { Component } from 'react'
import Nav from '../components/Nav'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {appActions, userActions} from '../actions/'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const darkMuiTheme = getMuiTheme(darkBaseTheme)
class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.props.setGridCols(window.innerWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

	handleResize = (e) => {
    this.props.setGridCols(window.innerWidth)
  }

  handleDismissClick = (e) => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDismissClick}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleDismissClick}
      />,
    ]

    return (
      <Dialog
        actions={actions}
        modal={false}
        style={{color: '#fff', zIndex: '3000'}}
        open={true}
        onRequestClose={this.handleDismissClick}>
        {errorMessage}
      </Dialog>
    )
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
          {this.renderErrorMessage()}
          <Nav className="nav-ctr" {...this.props} navigate={this.navigate} />
					{subNav}
          {main}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    leftDrawerOpen: state.getIn(['app', 'leftDrawerOpen']),
    user: state.get('user'),
    errorMessage: state.getIn(['app', 'errorMessage'])
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
    setGridCols: (width) => {
      dispatch(appActions.setGridCols(width))
    },
    signOut: () => {
      dispatch(userActions.signOut())
    },
    resetErrorMessage: () => {
      dispatch(appActions.resetErrorMessage())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
