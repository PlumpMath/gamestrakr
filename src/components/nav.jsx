import React from 'react';

export default React.createClass({
  getNavItems: function(){
    return this.props.navItems || [];
  },
  render: function() {
    return <div className="nav-ctr">
      {this.getNavItems().map(navItem =>
        <button key={navItem}>
          <span>{navItem}</span>
        </button>
        )}
      </div>;
  }
});
