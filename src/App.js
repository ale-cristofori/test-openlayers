import React, { Component } from 'react';
import {fromLonLat} from 'ol/proj.js';

import './App.css';
import MapComponent from './Map';
import LocationsSelect from './LocationsSelect';

class App extends Component {

  
  constructor () {
    super();
    this.locations = [
      {name: 'london', coords: fromLonLat([-0.12755, 51.507222])},
      {name: 'moscow', coords: fromLonLat([37.6178, 55.7517])},
      {name: 'istanbul', coords: fromLonLat([28.9744, 41.0128])},
      {name: 'rome', coords: fromLonLat([12.5, 41.9])},
      {name: 'bern', coords: fromLonLat([7.4458, 46.95])}
    ]
    this.state = {
      currentLocation : fromLonLat([-0.12755, 51.507222])
    }
    this.zoomToLocation = this.zoomToLocation.bind(this);
  }

  zoomToLocation(e) {
    const selectedIndex = e.target.selectedOptions[0].index;
    const selectedLocation = this.locations[selectedIndex].coords;
    this.setState(() => {
      return {
        currentLocation : selectedLocation
      }
    });
  }

  render() {
    return (
      <div className="App">
      <LocationsSelect locations={this.locations} onSelectLocation={this.zoomToLocation}/>
      <MapComponent currentLocation={this.state.currentLocation}/>
      </div>
    );
  }
}

export default App;

