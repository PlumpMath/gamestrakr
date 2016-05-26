import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Map} from  'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import Grid from '../components/Grid'
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

class Games extends Component{
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

  render() {
    return (
      <div className="app-ctr">
        <Grid items={this.props.gamesByTypes} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType.toLowerCase()
  const games = state.getIn(['entities', 'games'])
  const gamesByTypePagination =
    state.getIn(['pagination', 'gamesByType', gamesType]) || Map({ids: []})
  const gamesByTypes = gamesByTypePagination.get('ids').map(id => games.get(id))

  const itemsPerPage =  state.getIn(['app', 'itemsPerPage'])
  const gridCols = state.getIn(['app', 'gridCols'])

  return {gamesType, gamesByTypes, gamesByTypePagination}
}

function mapDispatchToProps(dispatch, ownProps){
  const loadGamesByType = gamesActions.loadGamesByType
  const saveGame = (game, status) => {
    dispatch(gameActions.saveGame(game, status))
  }

  return {loadGamesByType, saveGame}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games)

