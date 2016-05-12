import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';
import {hasIn} from 'lodash';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamerLyfe&w=450&h=300&txttrack=0'

const GameTile = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function(){
    return {
      imageUrl: this.getGameImageUrl(this.props.game)
    };
  },

  getGameImageUrl: function(game){
    if(hasIn(game, 'image.small_url')) return game.image.small_url;
    if(hasIn(game, 'image.medium_url')) return game.image.medium_url;
    return placeholderImageUrl;
  },

  onImageError: function(){
    this.setState({imageUrl: placeholderImageUrl});
  },

  render(){
    const {game} = this.props;

    return (
      <GridTile
        title={game.name}>
        <img
          src={this.state.imageUrl}
          onError={this.onImageError}/>
      </GridTile>
    );
  }
});

export default GameTile;
