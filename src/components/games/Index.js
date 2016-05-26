import React from 'react'
import {connect} from 'react-redux'
import {List, Map} from  'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import Grid from './Grid'
import { gamesActions } from '../../actions'

const loadGamesByType = gamesActions.loadGamesByType;

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

const Index = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount() {
    loadData(this.props)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.gamesType !== this.props.gamesType) {
      loadData(nextProps)
    }
  },

  render() {
    return (
      <div className="app-ctr">
        <Grid baseUrl={'games'} items={this.props.gamesByTypes} />
        {this.props.children}
      </div>
    )
  }
})

function mapStateToProps(state, ownProps) {
  const gamesType = ownProps.params.gamesType.toLowerCase()
  const games = state.getIn(['entities', 'games'])

  const gamesByTypePagination = state.getIn(['pagination', 'gamesByType', gamesType]) || Map({ids: []})
  const gamesByTypes = gamesByTypePagination.get('ids').map(id => games.get(id))

  return {gamesType, gamesByTypes, gamesByTypePagination}
}

export default connect(mapStateToProps, {
  loadGamesByType
})(Index)


// Might use in future
// sortedItems: function(){
//   const items = this.props.items

//   if (items){
//     return items
//       .sort((a, b) =>
//         new Date(a.get('original_release_date')) < new Date(b.get('original_release_date')))
//   } else {
//     return List()
//   }
// },
//

