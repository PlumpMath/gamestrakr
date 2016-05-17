import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {openLoginDialog, closeLoginDialog} from '../../actions';

const Login = React.createClass({
  mixins: [PureRenderMixin],

  render(){
    const actions = [
      <FlatButton
        label={"Twitter"}
        primary={true}
        linkButton={true}
        href={`${process.env.SERVER_URL}/auth/twitter`}/>,
      <FlatButton
        label={"Facebook"}
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
      </Dialog>
    );
  }
});

function mapStateToProps(state){
  return {
    loginDialogOpen: state.getIn(['ui', 'loginDialogOpen'])
  };
}

function mapDispatchToProps(dispatch){
  return {
    openLoginDialog: () => {
      dispatch(openLoginDialog());
    },
    closeLoginDialog: () => {
      dispatch(closeLoginDialog());
    }
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
