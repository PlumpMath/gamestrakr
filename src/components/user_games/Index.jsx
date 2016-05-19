import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';

import {fetchUserGamesIfNeeded} from '../../actions';
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

  getGamesByStatus(status){
    const {items} = this.props;
		if(items){
			return items.takeWhile((item) => ( item.get('status') === status ));
		}	else {
			return List();
		}
  },

  render() {
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    return (
      <div className="home-ctr">
				<Tabs>
					{statuses.map((status) => (
						<Tab key={status} label={status}>
							<Grid addUserGame={this.props.addUserGame} items={this.getGamesByStatus(status)} />
						</Tab>
					))}
				</Tabs>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    items: state.getIn(['user', 'games'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(fetchUserGamesIfNeeded());
    },
    addUserGame: (name, imageUrl, giantBombUrl, status) => {
      dispatch(addUserGame(name, imageUrl, giantBombUrl, status));
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer;
