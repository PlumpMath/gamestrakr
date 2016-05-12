import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGames} from '../actions';

import GameGrid from './GameGrid';

const Home = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames();
  },

  render() {
    return (
      <div className="home-ctr">
        <GameGrid games={this.props.games} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    games: state.get('games')
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchGames: () => {
        dispatch(fetchGames({page: 'home'}));
      }
    };
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
