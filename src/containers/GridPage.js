import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Map} from  'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Grid from '../components/Grid'
import Tile from '../components/Tile'
import { gamesActions } from '../actions'

const styles = {
  toolbar: {
    width: '100%',
    backgroundColor: '#212121'
  }
}

function loadData(props) {
  const { gamesType } = props
  props.loadGamesByType(gamesType)
}

class GridPage extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gamesType !== this.props.gamesType) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadGamesByType(this.props.gamesType, true)
  }

	libTypeOfGame = (name) => {
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped']
		return this.props.gamesByType
      .filter((v, k) => types.includes(k))
      .findKey((v, k) => v.hasIn(['ids', name]))
	}

  handleTileTap = (name) => {
    this.context.router.push(`game/${name}`)
  }

	renderGame = (game) => {
		return <Tile
			key={game.get('name')}
			item={game}
			libTypeOfItem={(name) => this.libTypeOfGame(name)}
			saveGame={this.props.saveGameByType}
			handleTileTap={this.handleTileTap} />
	}

  render() {
    const {gamesType, gridCols, gamesByTypeGames, gamesByTypePagination} = this.props

    return (
      <Grid
        onLoadMoreClick={this.handleLoadMoreClick}
        items={gamesByTypeGames}
				renderItem={this.renderGame}
				gamesType={gamesType}
				gridCols={gridCols}
        {...gamesByTypePagination.toJS()} />
    )
  }
}

GridPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType
  const games = state.getIn(['entities', 'games'])
	const gamesByType = state.getIn(['pagination', 'gamesByType'])
  const gamesByTypePagination = state.getIn(['pagination', 'gamesByType', gamesType]) || Map({ids: []})
  const gamesByTypeGames = gamesByTypePagination.get('ids').map(id => games.get(id))

  const itemsPerPage =  state.getIn(['app', 'itemsPerPage'])
  const gridCols = state.getIn(['app', 'gridCols'])

  return {gridCols, gamesByType, gamesType, gamesByTypeGames, gamesByTypePagination}
}

export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType,
  saveGameByType: gamesActions.saveGameByType
}
)(GridPage)

