import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { libTypes } from '../constants';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import startCase from 'lodash/startCase';
import { GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrackr&w=450&h=300&txttrack=0';

const styles = {
  menuItem: {
    textTransform: 'capitalize',
  },
};

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { game,
      saveGameByType,
      gamesType,
      popOverOpen,
      popOverAnchor,
      handleClosePopOver,
      imageUrl,
      handleTileTap } = this.props;

    return (
      <GridTile
        className="tile-ctr"
        title={game.get('name')}
        onTouchTap={handleTileTap}
        actionIcon={<IconButton onTouchTap={this.props.handlePlusTap}>
          <FontIcon className="material-icons">
            {gamesType ? 'check_circle' : 'add_circle'}
          </FontIcon>
          <Popover
            open={popOverOpen}
            anchorEl={popOverAnchor}
            onRequestClose={handleClosePopOver}
          >
            <Menu>
              {libTypes.map((type, i) => (<MenuItem
                key={i}
                style={styles.menuItem}
                disabled={type === gamesType}
                primaryText={startCase(type)}
                onTouchTap={() => saveGameByType(game, type)}
              />
              ))}
            </Menu>
          </Popover>
        </IconButton>}
      >
        <object data={imageUrl} type="image/jpg">
          <img role="presentation" src={placeholderImageUrl} />
        </object>
      </GridTile>
    );
  }
}

Tile.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  saveGameByType: PropTypes.func.isRequired,
  handleTileTap: PropTypes.func.isRequired,
  handlePlusTap: PropTypes.func.isRequired,
  handleClosePopOver: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  gamesType: PropTypes.string,
  popOverOpen: PropTypes.bool,
  popOverAnchor: PropTypes.object,
};

