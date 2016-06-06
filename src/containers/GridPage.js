import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { OrderedSet } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Grid from '../components/Grid';
import { gamesActions } from '../actions';
import { libTypes } from '../constants';
import { getVisibleGamesByType, getGamesPaginationByType } from '../reducers';

class GridPage extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gamesType !== this.props.gamesType) {
      this.fetchData(nextProps);
    }
  }

  fetchData(props) {
    const { gamesType, userToken } = props;
    props.loadGamesByType(gamesType);
    if (userToken) {
      libTypes.map(type => props.loadGamesByType(type));
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadGamesByType(this.props.gamesType, true);
  }

  render() {
    const { gamesType, gridCols, games } = this.props;

    return (
      <Grid
        onLoadMoreClick={this.handleLoadMoreClick}
        items={games}
        renderTile={this.renderTile}
        gamesType={gamesType}
        gridCols={gridCols}
      />
    );
  }
}

GridPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

GridPage.propTypes = {
  gamesType: PropTypes.string.isRequired,
  gridCols: PropTypes.number,
  games: PropTypes.oneOfType([
    PropTypes.instanceOf(OrderedSet),
    PropTypes.array,
  ]).isRequired,
  loadGamesByType: PropTypes.func.isRequired,
  saveGameByType: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType;
  const gridCols = state.getIn(['app', 'gridCols']);
  const userToken = state.getIn(['user', 'token']);

  return {
    gridCols,
    userToken,
    games: getVisibleGamesByType(state, gamesType),
    gamesType,
    ...getGamesPaginationByType(state, gamesType),
  };
}

export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType,
  saveGameByType: gamesActions.saveGameByType,
}
)(GridPage);

