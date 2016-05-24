import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {appActions} from '../../actions/';

const Login = React.createClass({
  mixins: [PureRenderMixin],

  render(){
    const actions = [
      <FlatButton
        label={"Sign in With Twitter"}
        primary={true}
        linkButton={true}
        href={`${process.env.SERVER_URL}/auth/twitter`}/>,
      <FlatButton
        label={"Sign in With Facebook"}
        primary={true}
        linkButton={true}
        href={`${process.env.SERVER_URL}/auth/facebook`}/>
    ];

    return (
      <Dialog
        title="Log In"
        actions={actions}
        modal={false}
        open={this.props.loginDialogOpen || false}
        onRequestClose={this.props.closeLoginDialog}>
        <div>Sign in to persist saved games</div>
      </Dialog>
    );
  }
});

function mapStateToProps(state){
  return {
    loginDialogOpen: state.app.get('loginDialogOpen')
  };
}

function mapDispatchToProps(dispatch){
  return {
    openLoginDialog: () => {
      dispatch(appActions.openLoginDialog());
    },
    closeLoginDialog: () => {
      dispatch(appActions.closeLoginDialog());
    }
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
