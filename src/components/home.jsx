import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const Home = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    return (
      <div className="home-ctr">
        <h1>Home</h1>

        {this.props.games.map((game) => {
          return <h4 key={game}>{game}</h4>;
        })}
      </div>
    );
  }
});

function mapStateToProps(state){
  return {
    games: state.get('games')
  };
}

export const HomeContainer = connect(mapStateToProps)(Home);
