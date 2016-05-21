import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import {openLoginDialog, fetchGamesIfNeeded} from '../../actions';
import Grid from '../games/Grid';
import Tile from './Tile';

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

  itemsByStatus: function(status){
    if (this.props.items){
      return this.props.items.filter((item) => {
          return item.get('status') === status;
      });
    } else {
      return {items: List()};
    }
  },

  render() {
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    return (
      <div className="home-ctr">
        <Tabs>
          {statuses.map((status) => (
            <Tab key={status} label={status}>
              <Grid items={this.itemsByStatus(status)} tile={Tile} status={status} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
	return {
    items: state.gamesByType.getIn(['user', 'items'])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchGames: () => {
			dispatch(fetchGamesIfNeeded('user'));
		}
	};
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer;
