import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {fromLonLat} from 'ol/proj.js';

import './App.css';
import MapComponent from './Map';


const LocationsSelect = (props) => {
  const locations = props.locations.map((item, index) => 
  <option key={index} value={item.coords} className="dd-locations">{item.name}</option>
  );
  return(
      <div>
           <select onChange={props.onSelectLocation}>
              {locations}
          </select>
      </div>
  )
}

const ClearUploadedFeatures = (props) => { 
return(<button onClick={props.onClearLayer}>Clear Map</button>)
}

LocationsSelect.propTypes = {
  locations: PropTypes.array.isRequired,
  onSelectLocation: PropTypes.func.isRequired
}

class App extends Component {
  
  constructor () {
    super();
    this.locations = [
      {name: 'London', coords: fromLonLat([-0.12755, 51.507222])},
      {name: 'Moscow', coords: fromLonLat([37.6178, 55.7517])},
      {name: 'Istanbul', coords: fromLonLat([28.9744, 41.0128])},
      {name: 'Rome', coords: fromLonLat([12.5, 41.9])},
      {name: 'Bern', coords: fromLonLat([7.4458, 46.95])}
    ]
    this.state = {
      currentLocation : fromLonLat([-0.12755, 51.507222]),
      uploadedFeatures : []
    }
    this.panToLocation = this.panToLocation.bind(this);
    this.uploadFeature = this.uploadFeature.bind(this);
    this.clearLayer = this.clearLayer.bind(this);
  }



  panToLocation(e) {
    const selectedIndex = e.target.selectedOptions[0].index;
    const selectedLocation = this.locations[selectedIndex].coords;
    this.setState(() => {
      return {
        currentLocation : selectedLocation
      }
    });
  }


  uploadFeature(feature) {
    const featCentre = JSON.parse(feature).properties.centre;
    const Newfeatures = this.state.uploadedFeatures.slice();
    Newfeatures.push(feature);
    this.setState(() => {
      return {
        uploadedFeatures : Newfeatures,
        currentLocation : featCentre
      }
    })
  }

  clearLayer() {
    this.setState(() => {
      return {
        uploadedFeatures : []
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="interactions">
          <ClearUploadedFeatures onClearLayer={this.clearLayer} />
          <br />
          <LocationsSelect locations={this.locations} onSelectLocation={this.panToLocation}/>
        </div>
      <MapComponent currentLocation={this.state.currentLocation} 
                    features={this.state.uploadedFeatures} 
                    onUploadFeature={this.uploadFeature}/>
      </div>
    );
  }
}

export default App;

