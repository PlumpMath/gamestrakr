import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getGamesTypeById } from '../selectors';
import { gamesActions } from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tile from '../components/Tile';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrackr&w=450&h=300&txttrack=0';

class TileContainer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      popOverOpen: false,
      imageUrl: this.getGameImageUrl()
    };
  }

  getGameImageUrl = () => {
    const { game } = this.props;
    if (!game) return placeholderImageUrl;
    return game.getIn(['image', 'smallUrl'])
      || game.getIn(['image', 'mediumUrl'])
      || game.getIn(['image', 'largeUrl'])
      || placeholderImageUrl;
  }

  handleImageError = () => {
    this.setState({imageUrl: placeholderImageUrl});
  }

  handleTileTap = (e) => {
    const { game } = this.props;
    if (e.currentTarget.className === 'tile-ctr') {
      this.context.router.push(`game/${game.get('name')}`);
    }
  }

  handleClosePopOver= () => {
    this.setState({ popOverOpen: false });
  }

  handleAddGame = (type) => {
    const { game } = this.props;
    this.props.saveGameByType(game, type);
  }

  handlePlusTap= (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ popOverOpen: true, popOverAnchor: e.currentTarget });
  }

  render() {
    return (
      <Tile
        handleTileTap={this.handleTileTap}
        handlePlusTap={this.handlePlusTap}
        handleClosePopOver={this.handleClosePopOver}
        handleImageError={this.handleImageError}
        {...this.props}
        {...this.state}
      />
    );
  }
}

TileContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

TileContainer.propTypes = {
  gamesType: PropTypes.string,
  game: PropTypes.instanceOf(Map),
  saveGameByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  gamesType: getGamesTypeById(state, ownProps.game.get('name')),
});

export default connect(mapStateToProps, {
  saveGameByType: gamesActions.saveGameByType,
})(TileContainer);
