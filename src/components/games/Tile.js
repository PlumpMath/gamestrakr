import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hashHistory} from 'react-router';
import _ from 'lodash';
import {List} from 'immutable';

import {GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import {gameActions} from '../../actions/';

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
      imageUrl: this.getGameImageUrl(),
			popOverOpen: false
    };
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.item){
      this.setState({imageUrl: this.getGameImageUrl(nextProps.item)});
    }
  },

  getGameImageUrl: function(){
    const {item} = this.props
    if(!item) return placeholderImageUrl
    return item.get('imageUrl')
      || item.getIn(['image', 'small_url'])
      || item.getIn(['image', 'medium_url'])
      || placeholderImageUrl
  },

  onImageError: function(){
    this.setState({imageUrl: placeholderImageUrl});
  },

	onClosePopOver: function(){
		this.setState({popOverOpen: false});
	},

	onAddGame: function(status){
    const {item} = this.props;
    this.props.saveGame(item.get('name'), this.state.imageUrl, item.get('api_detail_url'), status);
	},

  gameHasStatus: function(status){
    return false;
    // return this.props.gamesByType.getIn([status, 'items'], List()).some((item) => {
    //   return item.get('name') === this.props.item.get('name');
    // });
  },

	onPlusTap: function(e){
		e.preventDefault();
    e.stopPropagation();
    this.setState({popOverOpen: true, popOverAnchor: e.currentTarget});
	},

	navigateToDetail: function(e){
    if(e.currentTarget.className == "tile-ctr"){
      const route= `${this.props.baseUrl}/${_.snakeCase(this.props.item.get('name'))}`;
      hashHistory.push(route);
    }
	},

  render(){
    const {item} = this.props;
    const statuses = ['playing', 'planning', 'completed', 'on-hold', 'dropped'];

    if (!item) return <div>Undefined item</div>

    return (
			<GridTile
        className="tile-ctr"
				title={item.get('name')}
        onTouchTap={this.navigateToDetail}
				actionIcon={
					<IconButton onTouchTap={this.onPlusTap}>
						<FontIcon className="material-icons">{false ? 'check_circle' : 'add_circle'}</FontIcon>
						<Popover
							open={this.state.popOverOpen}
							anchorEl={this.state.popOverAnchor}
							onRequestClose={this.onClosePopOver}>
							<Menu>
								{statuses.map((status, i) => (
									<MenuItem
										key={i}
										style={styles.menuItem}
										disabled={this.gameHasStatus(status)}
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
    gamesByType: state.gamesByType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveGame: (name, imageUrl, giantBombUrl, status) => {
      dispatch(gameActions.requestSaveGame(name, imageUrl, giantBombUrl, status));
    }
  };
};

const TileContainer = connect(mapStateToProps, mapDispatchToProps)(Tile);

export default TileContainer;
