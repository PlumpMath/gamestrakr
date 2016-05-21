import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGamesIfNeeded, setGamesType} from '../../actions';

import Grid from './Grid';

const defaultGamesType = 'recent';

const Index = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames(this.props.gamesType);
    this.props.fetchGames('user');
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
  var gamesType = state.app.get('selectedGamesType') || defaultGamesType;

  return {
    gamesType: gamesType,
    items: state.gamesByType.getIn([gamesType, 'items']),
    page: state.gamesByType.getIn([gamesType, 'page'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(fetchGamesIfNeeded(gamesType));
    },
    setGamesType: (gamesType) => {
      dispatch(setGamesType(gamesType));
    },
    nextPage: (gamesType) => {
      dispatch(nextPage(gamesType));
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer
