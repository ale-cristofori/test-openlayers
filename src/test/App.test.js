import React from 'react';
import { configure, shallow, mount, render} from 'enzyme';
import chai, { expect } from 'chai';
import App from '../App';
import chaiEnzyme from 'chai-enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let appWrapper; 
let selectWrapper; 
let mapComponent;

describe('App Component testing', function() {
  
  beforeEach(() => {
    /*create our enzyme wrappers for every test run
    for every component of our app*/
    appWrapper = mount(<App />);
    mapComponent = appWrapper.find('MapComponent');
    selectWrapper = appWrapper.find('select');
  })


  it('App drop down input rendering', () => {
    const editText = '<select><option value="-14198.801050682045,6711510.640113423" class="dd-locations">London</option><option value="4187594.340763207,7509144.108588474" class="dd-locations">Moscow</option><option value="3225415.454040626,5014229.844289909" class="dd-locations">Istanbul</option><option value="1391493.6349159197,5146011.679282788" class="dd-locations">Rome</option><option value="828862.6645485563,5933916.615134273" class="dd-locations">Bern</option></select>';
    expect(selectWrapper.html()).to.equal(editText);
});


  it('Pan to selection behaviour', () => {
    expect(mapComponent).to.have.length(1);
    selectWrapper.simulate('change', { target: { selectedOptions : [ {index: 3} ]}});
    /*the timeout is needed because of the animation (2 secs) 
      the map view center won't be set immediately*/
    setTimeout(() => {
      expect(mapComponent.instance().props.currentLocation).to.deep.equal([1391493.6349159197, 5146011.679282788]);
    }, 3000);
  });

chai.use(chaiEnzyme())

})

