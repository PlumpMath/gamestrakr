import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import css from './stylesheets/style.css';

//Home - where users can view currently playing, their own collection, etc
//Upcoming - where users can see a list of upcoming games with links to each game's page/discussions
//Sales - possible section where users can submit and upvote sales
//Discussion - open forum discussion

const navItems = ['Home', 'Upcoming', 'Sales', 'Music', 'Discussion'];

ReactDOM.render(
  <Nav navItems={navItems} />,
  document.getElementById('app')
);
