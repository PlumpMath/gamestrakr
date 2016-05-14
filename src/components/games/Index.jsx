import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGamesIfNeeded} from '../../actions';

import Grid from './Grid';

const defaultGamesType = 'recent';

const Index= React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames(this.props.gamesType);
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
  var gamesType = state.getIn(['app', 'selectedGamesType']) || defaultGamesType;

  return {
    gamesType: gamesType,
    items: state.getIn(['gamesByType', gamesType, 'items'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(fetchGamesIfNeeded(gamesType));
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer
