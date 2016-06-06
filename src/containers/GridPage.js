import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, OrderedSet, List } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Grid from '../components/Grid';
import { gamesActions } from '../actions';
import { libTypes } from '../constants';
import { getGamesPaginationByType, getGamesByType } from '../reducers';
import TileContainer from '../containers/TileContainer';

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

  renderTile(game) {
    return <TileContainer key={game.get('name')} game={game} />;
  }

  render() {
    return (
      <Grid
        onLoadMoreClick={this.handleLoadMoreClick}
        renderTile={this.renderTile}
        gridCols={this.props.gridCols}
        gamesType={this.props.gamesType}
        gamesByType={this.props.gamesByType}
        {...this.props.pagination.toJS()}
      />
    );
  }
}

GridPage.propTypes = {
  gamesType: PropTypes.string.isRequired,
  gamesByType: PropTypes.oneOfType([
    PropTypes.instanceOf(OrderedSet),
    PropTypes.instanceOf(List),
  ]),
  gridCols: PropTypes.number,
  loadGamesByType: PropTypes.func.isRequired,
  pagination: PropTypes.instanceOf(Map),
};

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType;
  const gridCols = state.getIn(['app', 'gridCols']);
  const userToken = state.getIn(['user', 'token']);
  const pagination = getGamesPaginationByType(state, gamesType);
  const gamesByType = getGamesByType(state, gamesType);

  return {
    gridCols,
    userToken,
    gamesType,
    pagination,
    gamesByType,
  };
}

export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType,
}
)(GridPage);

