import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getNavItems: function(){
    return this.props.navItems || [];
  },
  getOpenState: function(){
    return this.props.drawerOpen;
  },
  render: function() {
    return (
      <div>
      <Drawer docked={false} open={this.getOpenState()}>
        {this.getNavItems().map((item) => {
          return <MenuItem key={item}>{item}</MenuItem>;
        })}
      </Drawer>
    </div>
    );
  }
});
