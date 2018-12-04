import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount, render} from 'enzyme';
import chai, { expect } from 'chai';
import logo from '../logo.svg';
import App from '../App';
import chaiEnzyme from 'chai-enzyme';

import Adapter from 'enzyme-adapter-react-16';


class Fixture extends React.Component {
  render () {
    return (
      <div>
        <img src={logo} alt="logo" />
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    )
  }
}

configure({ adapter: new Adapter() });

describe('App Component testing', function() {

/*   it('renders without crashing', function() {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked()
    expect(wrapper.find('#not')).to.not.be.checked()
  });
 */
  it('renders welcome message', () => {
    const wrapper = shallow(<App />);
    const welcome = <p>Edit <code>src/App.js</code> and save to reload.</p>;
    expect(wrapper).to.contain(welcome);
});

  chai.use(chaiEnzyme())

  
/*   it('renders without crashing', function() {
    const wrapper = shallow(<App />);
    const welcome = <h1 className="test">Welcome to React</h1>;
    expect(wrapper.contains(welcome)).to.equal(true);
  }) */

/*   it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  }); */
  
})

