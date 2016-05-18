import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchUserGamesIfNeeded} from '../../actions';

import Grid from '../games/Grid';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridCtr: {

  },
  h2: {
    textTransform: 'capitalize'
  }
};

const Index = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames();
  },

  getGamesByStatus(status){
    const {items} = this.props;
    if(items){
      return items.takeWhile((item) => {
        if(item.get('status') === status) return true;
      });
    } else {
      return [];
    }
  },

  render() {
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    return (
      <div style={styles.root} className="home-ctr">
        {statuses.map((status) => (
          <div key={status} style={styles.gridCtr}>
            <h2 style={styles.h2}>{status}</h2>
            {this.getGamesByStatus(status).map((game, i) => (
              <div key={i}>{game.get('name')}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    items: state.getIn(['user', 'games'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (gamesType) => {
      dispatch(fetchUserGamesIfNeeded());
    }
  };
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexContainer;
