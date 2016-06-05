import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { userActions } from '../actions/';
import { connect } from 'react-redux';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { name, token } = this.props.location.query;
    if (name && token) this.props.userFromAuth(name, token);
  }

  render() {
    const { authType } = this.props.params;

    const authActions = {
      success: [
        <FlatButton
          label={"Check out your saved games"} primary linkButton href={'#/library'}
        />,
        <FlatButton
          label={"Look at the hot new releases"} primary linkButton href={'#/games/recent'}
        />,
      ],
      login: [
        <FlatButton
          label={"Sign in With Twitter"}
          primary linkButton href={`${process.env.SERVER_URL}/auth/twitter`}
        />,
        <FlatButton
          label={"Sign in With Facebook"}
          primary linkButton href={`${process.env.SERVER_URL}/auth/facebook`}
        />,
      ],
    };
    const authText = {
      success: { title: 'You have been signed in', body: 'Congratulations' },
      login: {
        title: 'Please sign in below',
        body: 'Sign in and you can store your GamesTrakr library in the cloud',
      },
    };

    return (
      <Dialog
        title={authText[authType].title}
        actions={authActions[authType]}
        modal={false}
        open
        onRequestClose={() => this.context.router.push('/')}
      >
        <div>{authText[authType].body}</div>
      </Dialog>
    );
  }
}

Auth.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(
  undefined,
  { userFromAuth: userActions.userFromAuth }
)(Auth);
