import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../actions/'
import {connect} from 'react-redux'

class AuthSucess extends Component{
  componentDidMount(){
    const {name, token} = this.props.location.query
    this.props.userFromAuth(name, token)
  }

  render(){
    const actions = [
      <FlatButton
        label={"Check out your saved games"}
        primary={true}
        linkButton={true}
        href={'#/my_games'}/>,
          <FlatButton
            label={"Look at the hot new releases"}
            primary={true}
            linkButton={true}
            href={'#/games/recent'}/>
    ]

    return (
      <Dialog
        title="You have been signed in"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={() => this.props.history.push('/')}>
        <div>Congratulations</div>
      </Dialog>
    )
  }
}

export default connect(
  undefined,
  {userFromAuth: userActions.userFromAuth}
)(AuthSucess);
