import React from 'react';
import Loader from 'react-loaders'

import css from '../stylesheets/loader.scss';

const LoaderContainer = React.createClass({

  render(){
    return (
      <div className="loader-ctr">
        <Loader active={true} type="pacman" />
      </div>
    );
  }
});

export default LoaderContainer;
