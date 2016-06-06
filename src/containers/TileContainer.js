import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGamesTypeById } from '../reducers';
import Tile from '../components/Tile';

class TileContainer extends Component {

  handleTileTap = (name) => {
    this.context.router.push(`game/${name}`);
  }

}



function mapStateToProps(state, ownProps) {
}

export default connect(mapStateToProps)(GridPage);
