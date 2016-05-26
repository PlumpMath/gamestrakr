import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {appActions} from '../../actions/'

const Login = React.createClass({
  render(){
    const actions = [
      <FlatButton
        label={"Sign in With Twitter"}
        primary={true}
        linkButton={true}
        href={`${process.env.SERVER_URL}auth/twitter`}/>,
      <FlatButton
        label={"Sign in With Facebook"}
        primary={true}
        linkButton={true}
        href={`${process.env.SERVER_URL}auth/facebook`}/>
    ]

    return (
      <Dialog
        title="Log In"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.history.goBack}>
        <div>Sign in to persist saved games</div>
      </Dialog>
    )
  }
})

export default Login
