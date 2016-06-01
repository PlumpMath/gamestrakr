import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {connect} from 'react-redux'

import {gamesActions} from '../actions/'

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrackr&w=600&h=450&txttrack=0'

function loadData(props) {
  const name = props.params.name
  if(name) props.loadGameByName(name)
}

class Detail extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount(){
    if(!this.props.game){
      loadData(this.props)
    }
  }

  getGameImageUrl = () => {
    const {game} = this.props
    if(!game) return placeholderImageUrl
    return game.getIn(['image', 'largeUrl'])
      || game.getIn(['image', 'mediumUrl'])
      || game.getIn(['image', 'smallUrl'])
      || placeholderImageUrl
  }

	libTypeOfGame = (name) => {
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped']
		return this.props.gamesByType
      .filter((v, k) => types.includes(k))
      .findKey((v, k) => v.hasIn(['ids', name]))
	}

  renderCardActions = () => {
    const {game, saveGameByType} = this.props
    const libTypes = ['playing', 'planning', 'completed', 'onHold', 'dropped']
		const libTypeOfGame = this.libTypeOfGame(game.get('name'))

    return (
      <CardActions className="card-actions">
        {libTypes.map((type, i) => (
          <FlatButton
            key={i}
            disabled={type === libTypeOfGame}
            label={type}
            onTouchTap={() => saveGameByType(game, type)}/>
          ))}
      </CardActions>
    )
  }

  render(){
    const {game} = this.props

    if (game) {
      const styles = {
        cardImage: {
          backgroundImage: `url(${this.getGameImageUrl()})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
      }

      return (
        <div className="game-detail-ctr">
          <IconButton className="detail-go-back-btn" onClick={() => this.context.router.goBack()}>
            <FontIcon className="material-icons" color="black" >arrow_back</FontIcon>
          </IconButton>
          <Card className="game-detail-content">
            <CardHeader
              title={game.get('name')}
              subtitle={game.get('deck')} />
            <CardMedia
              overlay={<CardTitle title={game.get('name')} subtitle={game.get('deck')} />}>
              <div className="card-image-ctr" style={styles.cardImage} />
            </CardMedia>
            <CardTitle title={game.get('name')} subtitle={game.get('deck')} />
            <CardText className="card-text" dangerouslySetInnerHTML={{__html: game.get('description')}}/>
            {this.renderCardActions()}
          </Card>
        </div>
      )
    } else {
      return (
        <div className="game-detail-ctr">
          <IconButton className="detail-go-back-btn" onClick={() => this.context.router.goBack()}>
            <FontIcon className="material-icons" color="black" >arrow_back</FontIcon>
          </IconButton>
          <Card className="game-detail-content">
            <h1>Loading</h1>
          </Card>
        </div>
      )
    }
  }
}

Detail.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const gameId = ownProps.params.name
  const games = state.getIn(['entities', 'games'])
  const game = (games && games.size) ? games.get(gameId) : null
	const gamesByType = state.getIn(['pagination', 'gamesByType'])

  return {gameId, game, gamesByType}
}

export default connect(mapStateToProps, {
  loadGameByName: gamesActions.loadGameByName,
  saveGameByType: gamesActions.saveGameByType
})(Detail)

