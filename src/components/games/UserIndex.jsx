import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { hashHistory } from 'react-router';
import {List} from 'immutable';
import {connect} from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import {gameActions} from '../../actions/';
import Grid from './Grid';

const defaultGamesType = 'playing';
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
    this.props.setGamesType(defaultGamesType);
    this.props.fetchGames(defaultGamesType);
  },

  setGamesType: function(e, k, v){
    this.props.setGamesType(e.props.label);
    this.props.fetchGames(e.props.label);
  },

  render() {
    const statuses = ['playing', 'planning', 'completed', 'onHold', 'dropped'];

    return (
      <div className="app-ctr">
        <Tabs className="tabs-ctr app-ctr" contentContainerClassName="tabs-content-ctr app-ctr">
          {statuses.map((status) => (
            <Tab onActive={this.setGamesType} key={status} label={status}>
              <Grid gamesType={status} items={this.props.items} location={this.props.location}/>
            </Tab>
          ))}
        </Tabs>
        {this.props.children}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  var gamesType = state.app.get('selectedGamesType') || defaultGamesType;

	return {
    gamesType: gamesType,
    items: state.gamesByType.getIn([gamesType, 'items'])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchGames: (gamesType) => {
			dispatch(gameActions.fetchGamesIfNeeded(gamesType));
		},
    setGamesType: (gamesType) => {
      dispatch(gameActions.setGamesType(gamesType));
    }
	};
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer;
