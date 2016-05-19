import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import {addUserGame} from '../../actions';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrackr&w=450&h=300&txttrack=0'

const styles = {
	menuItem: {
		textTransform: 'capitalize'
	}
}

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

	onAddGame: function(status){
		const {item} = this.props;
		this.props.addUserGame(item.get('name'), this.state.imageUrl, item.get('api_detail_url'), status);
	},

	getUserGame: function(){
		const {userGames, item} = this.props;
		var game;
		if (userGames){
			game = userGames.find((v, k) => {
				if(v.get('name') ==	item.get('name')) return true;
			});
		}

		return game;
	},

  render(){
		const userGame = this.getUserGame();
    const {item} = this.props;
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    return (
			<GridTile
				title={item.get('name')}
				actionIcon={
					<IconButton onTouchTap={this.onPlusTap}>
						<FontIcon className="material-icons">add_circle</FontIcon>
						<Popover
							open={this.state.popOverOpen}
							anchorEl={this.state.popOverAnchor}
							onRequestClose={this.onClosePopOver}>
							<Menu>
								{statuses.map((status, i) => (
									<MenuItem
										key={i}
										style={styles.menuItem}
										disabled={userGame ? userGame.get('status') === status : false}
										primaryText={status}
										onTouchTap={this.onAddGame.bind(this, status)}/>
									))}
								</Menu>
							</Popover>
						</IconButton>}>
						<img
							src={this.state.imageUrl}
							onError={this.onImageError}/>
				</GridTile>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    userGames: state.getIn(['user', 'games'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserGame: (name, imageUrl, giantBombUrl, status) => {
      dispatch(addUserGame(name, imageUrl, giantBombUrl, status));
    }
  };
};

const TileContainer = connect(mapStateToProps, mapDispatchToProps)(Tile);

export default TileContainer;
