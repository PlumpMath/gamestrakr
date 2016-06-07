import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { libTypes } from '../constants';
import { Map } from 'immutable';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { getGamesTypeById, getGameById } from '../selectors';
import { gamesActions } from '../actions/';

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrakr&w=600&h=250&txttrack=0';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      imageUrl: this.getGameImageUrl()
    }
  }

  componentWillMount() {
    const {game} = this.props;
    if (!game) {
      this.fetchData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.game){
      this.setState({imageUrl: this.getGameImageUrl(nextProps.game)});
    }
  }

  getGameImageUrl = (game = null) => {
    if (!game) return placeholderImageUrl;
    return game.getIn(['image', 'largeUrl'])
      || game.getIn(['image', 'mediumUrl'])
      || game.getIn(['image', 'smallUrl'])
      || placeholderImageUrl;
  }

  fetchData(props) {
    const name = props.params.name;
    if (name) props.loadGameByName(name);
  }

  handleGoBack = () => {
    this.context.router.goBack();
  }

  handleImageError = () => {
    this.setState({imageUrl: placeholderImageUrl})
  }

  renderCardActions = () => {
    const { game, gamesType, saveGameByType } = this.props;

    return (
      <CardActions className="card-actions">
        {libTypes.map((type, i) => (
          <FlatButton
            key={i}
            disabled={type === gamesType}
            label={type}
            onTouchTap={() => saveGameByType(game, type)}
          />
          ))}
      </CardActions>
    );
  }

  render() {
    const { game } = this.props;

    if (game) {
      return (
        <div className="game-detail-ctr">
          <IconButton className="detail-go-back-btn" onClick={() => this.context.router.goBack()}>
            <FontIcon className="material-icons" color="black" >arrow_back</FontIcon>
          </IconButton>
          <Card className="game-detail-content">
            <CardHeader
              title={game.get('name')}
              subtitle={game.get('deck')}
            />
            <CardMedia
              overlay={<CardTitle title={game.get('name')} subtitle={game.get('deck')} />}
            >
              <img src={this.state.imageUrl} onError={this.handleImageError} />
            </CardMedia>
            <CardTitle title={game.get('name')} subtitle={game.get('deck')} />
            <CardText
              className="card-text" dangerouslySetInnerHTML={{ __html: game.get('description') }}
            />
            {this.renderCardActions()}
          </Card>
        </div>
      );
    }

    return (
      <div className="game-detail-ctr">
        <IconButton className="detail-go-back-btn" onClick={this.handleGoBack}>
          <FontIcon className="material-icons" color="black" >arrow_back</FontIcon>
        </IconButton>
        <Card className="game-detail-content">
          <h1>Loading</h1>
        </Card>
      </div>
    );
  }
}

Detail.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Detail.propTypes = {
  game: PropTypes.instanceOf(Map),
  gamesByType: PropTypes.instanceOf(Map),
  saveGameByType: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const gameId = ownProps.params.name;

  return {
    game: getGameById(state, gameId),
    gamesType: getGamesTypeById(state, gameId)
  };
}

export default connect(mapStateToProps, {
  loadGameByName: gamesActions.loadGameByName,
  saveGameByType: gamesActions.saveGameByType,
})(Detail);

