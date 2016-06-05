import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Tabs, Tab } from 'material-ui/Tabs';
import startCase from 'lodash/startCase';

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  setGamesType = (type) => {
    this.context.router.push(`library/${type}`);
  }

  render() {
    const types = ['playing', 'planning', 'completed', 'onHold', 'dropped'];
    return (
      <Tabs
        contentContainerClassName="tab-content-ctr"
        value={this.props.params.gamesType}
        onChange={(v) => this.setGamesType(v)}
      >
        {types.map((type) => (
          <Tab key={type} value={type} label={startCase(type)}>
            {this.props.children}
          </Tab>
          ))}
      </Tabs>
    );
  }
}

Library.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

