import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, OrderedSet } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Grid from '../components/Grid';
import Tile from '../components/Tile';
import { gamesActions } from '../actions';
import { libTypes } from '../constants';

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

  libTypeOfGame = (name) => {
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped'];
    return this.props.gamesByType
    .filter((v, k) => types.includes(k))
    .findKey((v) => v.hasIn(['ids', name]));
  }

  handleTileTap = (name) => {
    this.context.router.push(`game/${name}`);
  }

  renderGame = (game) => (
    <Tile
      key={game.get('name')} item={game}
      getLibTypeOfItem={(name) => this.libTypeOfGame(name)}
      saveGame={this.props.saveGameByType}
      handleTileTap={this.handleTileTap}
    />
  );

  render() {
    const { gamesType, gridCols, gamesByTypeGames, gamesByTypePagination } = this.props;

    return (
      <Grid
        onLoadMoreClick={this.handleLoadMoreClick}
        items={gamesByTypeGames}
        renderItem={this.renderGame}
        gamesType={gamesType}
        gridCols={gridCols}
        {...gamesByTypePagination.toJS()}
      />
    );
  }
}

GridPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

GridPage.propTypes = {
  gamesType: PropTypes.string.isRequired,
  loadGamesByType: PropTypes.func.isRequired,
  saveGameByType: PropTypes.func.isRequired,
  gamesByType: PropTypes.instanceOf(Map),
  gridCols: PropTypes.number,
  gamesByTypeGames: PropTypes.oneOfType([
    PropTypes.instanceOf(OrderedSet),
    PropTypes.array,
  ]).isRequired,
  gamesByTypePagination: PropTypes.instanceOf(Map),
};

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType;
  const games = state.getIn(['entities', 'games']);
  const gamesByType = state.getIn(['pagination', 'gamesByType']);
  const gamesByTypePagination =
    state.getIn(['pagination', 'gamesByType', gamesType]) || Map({ ids: [] });
  const gamesByTypeGames = gamesByTypePagination.get('ids').map(id => games.get(id));
  const gridCols = state.getIn(['app', 'gridCols']);
  const userToken = state.getIn(['user', 'token']);

  return { gridCols, userToken, gamesByType, gamesType, gamesByTypeGames, gamesByTypePagination };
}

export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType,
  saveGameByType: gamesActions.saveGameByType,
}
)(GridPage);

