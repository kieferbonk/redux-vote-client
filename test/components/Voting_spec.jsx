import React from 'react/addons';
import {List} from 'immutable';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bad Timing", "Eureka"]} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().textContent).to.equal('Bad Timing');
    expect(buttons[1].getDOMNode().textContent).to.equal('Eureka');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Bad Timing", "Eureka"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0].getDOMNode());

    expect(votedWith).to.equal('Bad Timing');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bad Timing", "Eureka"]}
              hasVoted="Bad Timing" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].getDOMNode().hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bad Timing", "Eureka"]}
              hasVoted="Bad Timing" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].getDOMNode().textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Bad Timing" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Bad Timing');
  });

  it('renders as a pure component', () => {
    const pair = ['Bad Timing', 'Eureka'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.getDOMNode().textContent).to.equal('Bad Timing');

    pair[0] = 'The Visitor';
    component.setProps({pair: pair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.getDOMNode().textContent).to.equal('Bad Timing');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Bad Timing', 'Eureka');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.getDOMNode().textContent).to.equal('Bad Timing');

    const newPair = pair.set(0, 'The Visitor');
    component.setProps({pair: newPair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.getDOMNode().textContent).to.equal('The Visitor');
  });
});
