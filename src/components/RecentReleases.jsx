import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGamesIfNeeded} from '../actions';

import GameGrid from './GameGrid';

const releaseType = "recent_releases";

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
		isFetching: state.getIn([releaseType, 'isFetching']),
    games: state.getIn([releaseType, 'games'])
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => {
      dispatch(fetchGamesIfNeeded(releaseType));
    }
  };
}

export const RecentReleasesContainer = connect(mapStateToProps, mapDispatchToProps)(RecentReleases);
