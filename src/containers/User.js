import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Map} from  'immutable'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs'

import Grid from '../components/games/Grid'
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

class Index extends Component{
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
    hashHistory.push(route)
    this.props.closeLeftDrawer()
  }

  render() {
    const statuses = ['playing', 'planning', 'completed', 'onHold', 'dropped']
    const {children} = this.props;

    return (
      <div className="app-ctr">
        <Tabs className="tabs-ctr app-ctr" contentContainerClassName="tabs-content-ctr app-ctr">
          {statuses.map((status) => (
            <Tab onActive={() => this.setGamesType(status)} key={status} label={status}>
              <Grid gamesType={status} items={this.props.items} />
            </Tab>
            ))}
          </Tabs>
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


export default connect(mapStateToProps, {
  loadGamesByType: gamesActions.loadGamesByType
})(Index)
