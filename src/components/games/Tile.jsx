import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamerLyfe&w=450&h=300&txttrack=0'

const Tile = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function(){
    return {
      imageUrl: this.getGameImageUrl(this.props.item),
			popOverOpen: false
    };
  },

  getGameImageUrl: function(item){
    return item.getIn(['image', 'small_url']) || item.getIn(['image', 'medium_url']) || placeholderImageUrl;
  },

  onImageError: function(){
    this.setState({imageUrl: placeholderImageUrl});
  },

	onPlusTap: function(e){
		e.preventDefault();
		this.setState({popOverOpen: true, popOverAnchor: e.currentTarget});
	},

	onClosePopOver: function(){
		this.setState({popOverOpen: false});
	},

  render(){
    const {item} = this.props;

    return (
      <GridTile
        title={item.get('name')}
        actionIcon={
					<IconButton onTouchTap={this.onPlusTap}>
						<FontIcon className="material-icons">add_circle</FontIcon>
					</IconButton>}>
        <img
          src={this.state.imageUrl}
          onError={this.onImageError}/>
				<Popover
					open={this.state.popOverOpen}
					anchorEl={this.state.popOverAnchor}
					onRequestClose={this.onClosePopOver}>
					<Menu>
						<MenuItem primaryText="Playing" />
						<MenuItem primaryText="Planning" />
						<MenuItem primaryText="Completed" />
						<MenuItem primaryText="On-Hold" />
						<MenuItem primaryText="Dropped" />
					</Menu>
				</Popover>
      </GridTile>
    );
  }
});

export default Tile;
