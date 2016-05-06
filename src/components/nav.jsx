import React from 'react';
import AppBar from 'material-ui/AppBar';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <AppBar
        title={this.props.title}
        onLeftIconButtonTouchTap={this.props.leftIconCB}
      />
    );
  }
});
