import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {fetchGames} from '../actions';

const Home = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function(){
    this.props.fetchGames();
  },

  // componentWillReceiveProps: function(){
  //   debugger
  // },

  render() {
    return (
      <div className="home-ctr">
        {this.props.games.map((game) => {
          return <h4 key={game.name}>{game.name}</h4>;
        })}
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
        dispatch(fetchGames({page: 'games'}));
      }
    };
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
