import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Dialog from 'material-ui/Dialog'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import {gameActions} from '../actions/'

export default class Detail extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render(){
    return (
      <div className="game-detail-ctr">
        <IconButton className="detail-go-back-btn" onClick={() => this.context.router.goBack()}>
          <FontIcon className="material-icons" color="black" >arrow_back</FontIcon>
        </IconButton>

        <Card className="game-detail-content">
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle" />
          <CardMedia
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
            <img src="http://lorempixel.com/600/337/nature/" />
          </CardMedia>
          <CardTitle title="Card title" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        );
      </div>
    )
  }
}

Detail.contextTypes = {
  router: React.PropTypes.object.isRequired
};
