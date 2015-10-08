import React from 'react';
import Voting from './components/Voting';

const pair = ['Bad Timing', 'Eureka'];

React.render(
  <Voting pair={pair} winner="Bad Timing" />,
  document.getElementById('app')
);
