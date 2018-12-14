import React from 'react';
import { configure, shallow, mount, render} from 'enzyme';
import chai, { expect } from 'chai';
import App from '../App';
import chaiEnzyme from 'chai-enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App Component testing', function() {

  it('App drop down input', () => {
    const selectWrapper = mount(<App />).find('select');
    const editText = '<select><option value="-14198.801050682045,6711510.640113423" class="dd-locations">London</option><option value="4187594.340763207,7509144.108588474" class="dd-locations">Moscow</option><option value="3225415.454040626,5014229.844289909" class="dd-locations">Istanbul</option><option value="1391493.6349159197,5146011.679282788" class="dd-locations">Rome</option><option value="828862.6645485563,5933916.615134273" class="dd-locations">Bern</option></select>';
    expect(selectWrapper.html()).to.equal(editText);
    //selectWrapper.simulate('change', {target: { value : "3225415.454040626,5014229.844289909"}});
    //expect(selectWrapper.props().value).to.be("3225415.454040626,5014229.844289909");
});

  chai.use(chaiEnzyme())

})

