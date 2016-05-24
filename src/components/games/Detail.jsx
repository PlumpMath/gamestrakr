import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hashHistory} from 'react-router';

import Dialog from 'material-ui/Dialog';

import {gameActions} from '../../actions/';

const styles = {
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: '100',
    backgroundColor: 'white'
  }
};

const Detail = React.createClass({
  navigateBack: function(){
		hashHistory.pop();
  },

  render(){
    return (
      <Dialog
        className="games-detail-ctr"
        title="Dialog With Custom Width"
        onRequestClose={this.navigateBack}
        modal={true}
        open={true}>
          This dialog spans the entire width of the screen.
      </Dialog>
    );
  }
});

export default Detail;
