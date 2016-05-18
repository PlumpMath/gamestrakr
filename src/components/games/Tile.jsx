import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamerLyfe&w=450&h=300&txttrack=0'

const Tile = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function(){
    return {
      imageUrl: this.getGameImageUrl(this.props.item)
    };
  },

  getGameImageUrl: function(item){
    return item.getIn(['image', 'small_url']) || item.getIn(['image', 'medium_url']) || placeholderImageUrl;
  },

  onImageError: function(){
    this.setState({imageUrl: placeholderImageUrl});
  },

  render(){
    const {item} = this.props;

    return (
      <GridTile
        title={item.get('name')}>
        <img
          src={this.state.imageUrl}
          onError={this.onImageError}/>
      </GridTile>
    );
  }
});

export default Tile;
