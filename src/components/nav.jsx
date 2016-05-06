import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <AppBar
        title={<Link to="/home">{this.props.appTitle}</Link>}
        onLeftIconButtonTouchTap={this.props.leftIconCB}
      />
    );
  }
});
