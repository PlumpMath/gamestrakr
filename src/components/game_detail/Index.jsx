import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
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

const Index = React.createClass({
  componentDidMount: function(){
    debugger;
  },
  componentWillEnter: function(){
    debugger;
  },
      // <Dialog
      //   className="games-detail-ctr"
      //   title="Dialog With Custom Width"
      //   modal={true}
      //   open={true}>
      //     This dialog spans the entire width of the screen.
      // </Dialog>

  render(){
    return (
      <div style={styles.root} className="games-detail-ctr">
        <h2>WHAT THE FUCK</h2>
      </div>
    );
  }
});

export default Index;
