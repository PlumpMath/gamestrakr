import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Dialog from 'material-ui/Dialog'

import {gameActions} from '../actions/'

const styles = {
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: '100',
    backgroundColor: 'white'
  }
}

export default class Detail extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render(){
    return (
      <Dialog
        className="games-detail-ctr"
        title="Game Detail Dialog"
        onRequestClose={() => this.props.context.router.goBack()}
        open={true}>
        Trust fund listicle tumblr forage poutine slow-carb. Ramps chia four dollar toast, franzen cardigan swag mixtape farm-to-table heirloom hammock single-origin coffee put a bird on it. Tote bag occupy selfies put a bird on it food truck. Meggings gastropub helvetica pour-over lo-fi, asymmetrical locavore pinterest. Echo park deep v PBR&B, etsy marfa vegan meh cold-pressed semiotics seitan banh mi fingerstache irony tattooed tacos. XOXO raw denim small batch post-ironic, bespoke everyday carry fashion axe normcore marfa waistcoat green juice hashtag street art. Shoreditch chambray kale chips microdosing godard ramps, quinoa thundercats church-key yr.
      </Dialog>
    )
  }
}
