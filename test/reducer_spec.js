it('handles SET_STATE without initial state', () => {
  const action = {
    type: 'SET_STATE',
    state: {
      vote: {
        pair: ['Bad Timing', 'Eureka'],
        tally: {Bad Timing: 1}
      }
    }
  };
  const nextState = reducer(undefined, action);

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Bad Timing', 'Eureka'],
      tally: {Bad Timing: 1}
    }
  }));
});
