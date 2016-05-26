import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../actions/'
import {connect} from 'react-redux'

class AuthSucess extends Component{
  componentDidMount(){
    const {name, token} = this.props.location.query
    if(name && token) this.props.userFromAuth(name, token)
  }

  render(){
    const {authType} = this.props.params

    const authActions = {
      success: [
        <FlatButton label={"Check out your saved games"} primary={true} linkButton={true} href={'#/my_games'}/>,
        <FlatButton label={"Look at the hot new releases"} primary={true} linkButton={true} href={'#/games/recent'}/>
      ],
      login: [ <FlatButton label={"Sign in With Twitter"} primary={true} linkButton={true} href={`${process.env.SERVER_URL}auth/twitter`}/>,
          <FlatButton label={"Sign in With Facebook"} primary={true} linkButton={true} href={`${process.env.SERVER_URL}auth/facebook`}/>
      ]
    }
    const authText = {
      success: {title: 'You have been signed in', body: 'Congratulations'},
      login: {title: 'Please sign in below', body: 'Sign in and you can store your GamesTrakr library in the cloud'}
    }

    return (
      <Dialog
        title={authText[authType]['title']}
        actions={authActions[authType]}
        modal={false}
        open={true}
        onRequestClose={() => this.context.router.push('/')}>
        <div>{authText[authType]['body']}</div>
      </Dialog>
    )
  }
}

export default connect(
  undefined,
  {userFromAuth: userActions.userFromAuth}
)(AuthSucess)
