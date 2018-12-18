import React from 'react';
import { configure, shallow, mount, render} from 'enzyme';
import chai, { expect } from 'chai';
import App from '../App';
import chaiEnzyme from 'chai-enzyme';
import { GeoJSON } from 'ol/format.js';

import { testFeature, testFeature2 } from './testFeature';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let appWrapper; 
let selectWrapper;
let buttonWrapper;
let mapComponent;

describe('App Component testing', function() {
  
  beforeEach(() => {
    /*create our enzyme wrappers for every test run
    for every component of our app*/
    appWrapper = mount(<App />);
    selectWrapper = appWrapper.find('select');
    mapComponent = appWrapper.find('MapComponent');
  })


  it('App drop down input rendering', () => {
    const editText = '<select><option value="-14198.801050682045,6711510.640113423" class="dd-locations">London</option><option value="4187594.340763207,7509144.108588474" class="dd-locations">Moscow</option><option value="3225415.454040626,5014229.844289909" class="dd-locations">Istanbul</option><option value="1391493.6349159197,5146011.679282788" class="dd-locations">Rome</option><option value="828862.6645485563,5933916.615134273" class="dd-locations">Bern</option></select>';
    expect(selectWrapper.html()).to.equal(editText);
});


  
it('Pan to selection behaviour', () => {
    expect(mapComponent).to.have.length(1);
    selectWrapper.simulate('change', { target: { selectedOptions : [ {index: 2} ]}});
    /*the timeout is needed because of the animation (2 secs) 
      the map view center won't be set immediately*/
    setTimeout(() => {
      expect(mapComponent.instance().olMap.getView().getCenter()).to.deep.equal([3225415.454040626, 5014229.844289909]);
    }, 3000);
  });

  it('Test the drop file behaviour', () => {
    expect(mapComponent.instance().olMap.getLayers().getArray()[1].getSource().getFeatures()).to.have.lengthOf(0);
    const mockFeature = new GeoJSON().readFeatures(testFeature);
    expect(mapComponent).to.have.length(1);
    mapComponent.instance().dragAndDropInteraction.dispatchEvent({
      type: 'addfeatures',
      features: mockFeature
    });
    expect(mapComponent.instance().olMap.getLayers().getArray()[1].getSource().getFeatures()).to.have.lengthOf(1);
    const mapCentre = mockFeature[0].getProperties().centre
    setTimeout(() => {
      expect(mapComponent.instance().olMap.getView().getCenter()).to.deep.equal(mapCentre);
    }, 3000);
  });

  it('Clear the uploadedFeatures layer', () => {
    buttonWrapper = appWrapper.find('button');
    expect(mapComponent).to.have.length(1);
    expect(mapComponent.instance().olMap.getLayers().getArray()[1].getSource().getFeatures()).to.have.lengthOf(0);
    const mockFeature1 = new GeoJSON().readFeatures(testFeature);
    const mockFeature2 = new GeoJSON().readFeatures(testFeature2);
    mapComponent.instance().dragAndDropInteraction.dispatchEvent({
      type: 'addfeatures',
      features: mockFeature1
    });
    mapComponent.instance().dragAndDropInteraction.dispatchEvent({
      type: 'addfeatures',
      features: mockFeature2
    });
    buttonWrapper.simulate('click');
    expect(mapComponent.instance().olMap.getLayers().getArray()[1].getSource().getFeatures()).to.have.lengthOf(0);
  });

chai.use(chaiEnzyme())

})

