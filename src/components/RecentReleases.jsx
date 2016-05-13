import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGamesIfNeeded} from '../actions';

import GameGrid from './GameGrid';

const pageName = "recent_releases";

const RecentReleases = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames();
  },

  render() {
    return (
      <div className="home-ctr">
        <GameGrid {...this.props} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
		isFetching: state.getIn([pageName, 'isFetching']),
    games: state.getIn([pageName, 'games'])
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => {
      dispatch(fetchGamesIfNeeded(pageName));
    }
  };
}

export const RecentReleasesContainer = connect(mapStateToProps, mapDispatchToProps)(RecentReleases);
