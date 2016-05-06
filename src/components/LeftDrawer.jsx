import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PureRenderMixin from 'react-addons-pure-render-mixin';

//TODO: Add on click handler to body/document that emits redux action to close this drawer

export default React.createClass({
  mixins: [PureRenderMixin],
  getNavItems: function(){
    return this.props.navItems || [];
  },
  render() {
    return (
      <Drawer open={this.props.open}>
        {this.getNavItems().map((item) => {
          return <MenuItem key={item}>{item}</MenuItem>;
        })}
        </Drawer>
    );
  }
});
