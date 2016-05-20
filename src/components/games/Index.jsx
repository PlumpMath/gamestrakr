import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGamesIfNeeded, fetchUserGamesIfNeeded, setGamesType} from '../../actions';

import Grid from './Grid';

const defaultGamesType = 'recent';

const Index = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames(this.props.gamesType);
    this.props.fetchUserGames();
  },

  render() {
    return (
      <div className="home-ctr">
        <Grid {...this.props} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  var gamesType = state.getIn(['ui', 'selectedGamesType']) || defaultGamesType;

  return {
    gamesType: gamesType,
    items: state.getIn(['gamesByType', gamesType, 'items'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(fetchGamesIfNeeded(gamesType));
    },
    fetchUserGames: (gamesType) => {
      dispatch(fetchUserGamesIfNeeded(gamesType));
    },
    setGamesType: (gamesType) => {
      dispatch(setGamesType(gamesType));
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer
