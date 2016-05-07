import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

//TODO: Add on click handler to body/document that emits redux action to close this drawer


export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function(){
    return {
      leftDrawerOpen: false
    };
  },

  getNavItems: function(){
    return this.props.navItems || [];
  },

  toggleLeftDrawer: function(){
    this.setState({leftDrawerOpen: !this.state.leftDrawerOpen});
  },

  render: function() {
    return (
      <div className="nav-ctr">
        <AppBar
          title={<Link to="/home">{this.props.appTitle}</Link>}
          onLeftIconButtonTouchTap={this.toggleLeftDrawer} />
        <Drawer open={this.state.leftDrawerOpen}>
          {this.getNavItems().map((item) => {
            return <MenuItem style={{color: 'black'}}  key={item}>{item}</MenuItem>;
          })}
          </Drawer>
      </div>
    );
  }
});
