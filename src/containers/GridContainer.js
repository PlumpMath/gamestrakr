import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, OrderedSet, List } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Grid from '../components/Grid';
import { gamesActions } from '../actions';
import { libTypes } from '../constants';
import { gamesSelectors } from '../selectors';
import TileContainer from '../containers/TileContainer';

class GridContainer extends Component {
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
    const { gamesType, userToken, loadGamesByType } = props;
    if (libTypes.includes(gamesType) && !userToken) {
      return null;
    }

    loadGamesByType(gamesType);
    if (userToken) {
      libTypes.map(type => loadGamesByType(type));
    }
  }

  handleRetry = () => {
    const { gamesType, loadGamesByType } = this.props;
    loadGamesByType(gamesType);
  }

  handleDismiss = () => {
    this.context.router.push('/');
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
        onRetry={this.handleRetry}
        onDismiss={this.handleDismiss}
        {...this.props}
      />
    );
  }
}

GridContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

GridContainer.propTypes = {
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

  const gamesByType = gamesSelectors.getGamesByType(state, gamesType);
  const pagination = gamesSelectors.getPagination(state, gamesType);
  const errorMessage = gamesSelectors.getErrorMessage(state, gamesType);

  return {
    gridCols,
    userToken,
    gamesType,
    ...pagination.toJS(),
    gamesByType,
    errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType,
}
)(GridContainer);

