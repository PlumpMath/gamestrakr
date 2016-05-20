import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import {openLoginDialog, fetchUserGamesIfNeeded} from '../../actions';
import Grid from './Grid';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridCtr: {

  },
  h2: {
    textTransform: 'capitalize'
  }
};

const Index = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames();
  },

  render() {
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];
    const signedOutMsg = (
      <div>
        <h2>Sign in to add games to your collection</h2>
        <RaisedButton label='Sign In' onTouchTap={this.props.openLoginDialog}/>
      </div>
    );
    const tabs = (
      <Tabs>
        {statuses.map((status) => (
          <Tab key={status} label={status}>
            <Grid addUserGame={this.props.addUserGame} status={status} />
          </Tab>
        ))}
      </Tabs>
    );

    return (
      <div className="home-ctr">
        {this.props.userName ? tabs : signedOutMsg}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
	return {
    items: state.getIn(['user', 'games', 'items']),
    userName: state.getIn(['user', 'name'])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchGames: (gamesType) => {
			dispatch(fetchUserGamesIfNeeded());
		},
    openLoginDialog: () => {
      dispatch(openLoginDialog());
    },
	};
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer;
