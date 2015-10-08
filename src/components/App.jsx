import React from 'react';
import {RouteHandler} from 'react-router';
import {List, Map} from 'immutable';

const pair = List.of('Bad Timing', 'Eureka');
const tally = Map({'Bad Timing': 5, 'Eureka': 4})

export default React.createClass({
  render: function () {
    return <RouteHandler pair={pair} tally={tally} />
  }
});
