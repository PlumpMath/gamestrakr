import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import {saveGame} from '../../actions';

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
			popOverOpen: false
    };
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
		this.props.saveGame(item.get('name'), item.get('imageUrl'), item.get('api_detail_url'), status);
	},

  render(){
    const {item} = this.props;
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    return (
			<GridTile
				title={item.get('name')}
				actionIcon={
					<IconButton onTouchTap={this.onPlusTap}>
						<FontIcon className="material-icons">check_circle</FontIcon>
						<Popover
							open={this.state.popOverOpen}
							anchorEl={this.state.popOverAnchor}
							onRequestClose={this.onClosePopOver}>
							<Menu>
								{statuses.map((status, i) => (
									<MenuItem
										key={i}
										style={styles.menuItem}
										disabled={item ? item.get('status') === status : false}
										primaryText={status}
										onTouchTap={this.onAddGame.bind(this, status)}/>
									))}
								</Menu>
							</Popover>
						</IconButton>}>
						<img
							src={item.get('imageUrl')}
							onError={this.onImageError}/>
				</GridTile>
    );
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveGame: (name, imageUrl, giantBombUrl, status) => {
      dispatch(saveGame(name, imageUrl, giantBombUrl, status));
    }
  };
};

const TileContainer = connect(undefined, mapDispatchToProps)(Tile);

export default TileContainer;
