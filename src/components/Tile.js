import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'lodash'
import {List} from 'immutable'

import {GridTile} from 'material-ui/GridList'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'

const placeholderImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=38&txt=GamesTrackr&w=450&h=300&txttrack=0'

const styles = {
	menuItem: {
		textTransform: 'capitalize'
	}
}

export default class Tile extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      imageUrl: this.getGameImageUrl(),
      popOverOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.item){
      this.setState({imageUrl: this.getGameImageUrl(nextProps.item)})
    }
  }

  getGameImageUrl = () => {
    const {item} = this.props
    if(!item) return placeholderImageUrl
    return item.getIn(['image', 'smallUrl']) || item.getIn(['image', 'mediumUrl']) || placeholderImageUrl
  }

  onImageError = () => {
    this.setState({imageUrl: placeholderImageUrl})
  }

  onClosePopOver = () => {
    this.setState({popOverOpen: false})
  }

  onAddGame = (type) => {
    const {item} = this.props
    this.props.saveGame(item, type)
  }

  gameHasType = (status) => {
    return false
    // return this.props.gamesByType.getIn([status, 'items'], List()).some((item) => {
    //   return item.get('name') === this.props.item.get('name')
    // })
  }

  onPlusTap = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({popOverOpen: true, popOverAnchor: e.currentTarget})
  }

  onTileTap= (e) => {
    const {item, navigate} = this.props
    if(e.currentTarget.className == "tile-ctr"){
      this.props.handleTileTap(item.get('name'))
    }
  }

  render(){
    const {item, saveGame} = this.props
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped']

    return (
      <GridTile
        className="tile-ctr"
        title={item.get('name')}
        onTouchTap={this.onTileTap}
        actionIcon={
          <IconButton onTouchTap={this.onPlusTap}>
            <FontIcon className="material-icons">{false ? 'check_circle' : 'add_circle'}</FontIcon>
            <Popover
              open={this.state.popOverOpen}
              anchorEl={this.state.popOverAnchor}
              onRequestClose={this.onClosePopOver}>
              <Menu>
                {types.map((type, i) => (
                  <MenuItem
                    key={i}
                    style={styles.menuItem}
                    disabled={this.gameHasType(type)}
                    primaryText={type}
                    onTouchTap={() => saveGame(item, type)}/>
                  ))}
                </Menu>
              </Popover>
            </IconButton>}>
            <img
              src={this.state.imageUrl}
              onError={this.onImageError}/>
          </GridTile>
    )
  }
}
