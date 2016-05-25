import React from 'react'
import {connect} from 'react-redux'
import {List, Map} from  'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import Grid from './Grid'
import { loadGamesByType } from '../../actions'

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
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps)
    }
  },

  render() {
    return (
      <div className="app-ctr">
        <Grid baseUrl={'games'} {...this.props} />
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const gamesType = ownProps.params.gamesType.toLowerCase()
  const games = state.entities.get('games');

  const gamesByTypePagination = state.pagination.gamesByType.get(gamesType) || Map({ids: []})
  const gamesByTypes = gamesByTypePagination.get('ids').map(id => games[id])

  return {gamesType, gamesByTypes, gamesByTypePagination}
}

export default connect(mapStateToProps, {
  loadGamesByType
})(Index)


// Might use in future
// sortedItems: function(){
//   const items = this.props.items;

//   if (items){
//     return items
//       .sort((a, b) =>
//         new Date(a.get('original_release_date')) < new Date(b.get('original_release_date')))
//   } else {
//     return List();
//   }
// },
//

