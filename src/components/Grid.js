import React, { Component, PropTypes } from 'react';
import { OrderedSet } from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import startCase from 'lodash/startCase';
import { GridList } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%',
  },
  gridList: {
    width: '100%',
    overflowY: 'auto',
  },
  floatingBtn: {
    float: 'right',
    top: '-50%',
    translate: 'transformY(-50%)',
  },
  gridCtr: {
    width: '100%',
    overflowY: 'auto',
    minHeight: '815px',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
  },
  loadMoreBtn: {
    margin: '10px',
  },
  loadMoreLabel: {
    fontSize: '20px',
  },
};

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderLoadMore = () => {
    const { isFetching, onLoadMoreClick } = this.props;

    return (
      <RaisedButton
        label={isFetching ? 'Loading...' : 'Load More'}
        primary
        onClick={onLoadMoreClick}
        style={styles.loadMoreBtn}
        labelStyle={styles.loadMoreLabel}
        disabled={isFetching}
      />
    );
  }

  render() {
    const {
      ids, isFetching, gridCols, pageCount,
      nextPageUrl, gamesType, renderTile,
    } = this.props;

    const isEmpty = (!ids || ids.size === 0);
    if (isEmpty && isFetching) {
      return <CircularProgress style={styles.loader} size={2} />;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1>{`No games saved as ${startCase(gamesType)}`}</h1>;
    }

    return (
      <div style={styles.root}>
        <div className="grid-ctr" style={styles.gridCtr}>
          <GridList cellHeight={200} cols={gridCols || 6} style={styles.gridList}>
            {ids.map((id) => renderTile(id))}
          </GridList>
        </div>
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}

Grid.propTypes = {
  isFetching: PropTypes.bool,
  pageCount: PropTypes.number,
  nextPageUrl: PropTypes.string,
  ids: PropTypes.oneOfType([
    PropTypes.instanceOf(OrderedSet),
    PropTypes.array,
  ]),
  onLoadMoreClick: PropTypes.func.isRequired,
  renderTile: PropTypes.func.isRequired,
  gridCols: PropTypes.number.isRequired,
  gamesType: PropTypes.string.isRequired,
};

