import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const store = createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['The Visitor', 'Eureka'],
      taly: {'The Visitor': 2}
    }
  }
})

const routes = <Route handler={App}>
  <Route path="/results" handler={Results} />
  <DefaultRoute handler={Voting} />
</Route>;

Router.run(routes, (Root) => {
  React.render(
    <Provider store={store}>
      {() => <Root />}
    </Provider>,
    document.getElementById('app')
  );
});
