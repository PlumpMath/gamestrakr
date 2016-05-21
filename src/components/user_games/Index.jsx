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

    return (
      <div className="home-ctr">
        <Tabs>
          {statuses.map((status) => (
            <Tab key={status} label={status}>
              <Grid addUserGame={this.props.addUserGame} status={status} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
	return {
    items: state.user.getIn(['games', 'items'])
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
