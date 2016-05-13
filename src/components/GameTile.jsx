import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';
import {hasIn} from 'immutable';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamerLyfe&w=450&h=300&txttrack=0'

const GameTile = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function(){
    return {
      imageUrl: this.getGameImageUrl(this.props.game)
    };
  },

  getGameImageUrl: function(game){
    return game.getIn(['image', 'small_url']) || game.getIn(['image', 'medium_url']) || placeholderImageUrl;
  },

  onImageError: function(){
    this.setState({imageUrl: placeholderImageUrl});
  },

  render(){
    const {game} = this.props;

    return (
      <GridTile
        title={game.get('name')}>
        <img
          src={this.state.imageUrl}
          onError={this.onImageError}/>
      </GridTile>
    );
  }
});

export default GameTile;
