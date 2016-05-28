import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Map} from  'immutable'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs'

import Grid from '../components/Grid'
import { gamesActions } from '../actions'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridCtr: {
  },
  h2: {
    textTransform: 'capitalize'
  }
}

function loadData(props) {
  const { gamesType } = props
  props.loadGamesByType(gamesType)
}

class Library extends Component{
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

  setGamesType(type) {
    this.context.router.push(`library/${type}`)
  }

  render() {
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped']
    const {children, gamesType, gamesByTypePagination, gamesByTypes} = this.props

    return (
      <Tabs
        contentContainerClassName="tab-content-ctr"
        onChange={(v) => this.setGamesType(v)}
        value={gamesType}>
        {types.map((type) => (
          <Tab key={type} value={type} label={type}>
            {React.cloneElement(children, Object.assign(
              {},
              {items: gamesByTypes, gamesType: gamesType},
              gamesByTypePagination.toJS()))}
          </Tab>
          ))}
        </Tabs>
    )
  }
}

Library.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType
  const games = state.getIn(['entities', 'games'])
  const gamesByTypePagination =
    state.getIn(['pagination', 'gamesByType', gamesType]) || Map({ids: []})
  const gamesByTypes = gamesByTypePagination.get('ids').map(id => games.get(id))

  const itemsPerPage =  state.getIn(['app', 'itemsPerPage'])
  const gridCols = state.getIn(['app', 'gridCols'])

  return {gamesType, gamesByTypes, gamesByTypePagination}
}


export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType
})(Library)

