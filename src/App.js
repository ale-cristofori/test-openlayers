import React, { Component } from 'react';
import {fromLonLat} from 'ol/proj.js';

import './App.css';
import MapComponent from './Map';


const LocationsSelect = (props) => {
  const locations = props.locations.map((item, index) => 
  <option key={index} value={item.coords} className="dd-locations">{item.name}</option>
  );
  return(
      <div>
          <select onChange={e => props.onSelectLocation(e.target.selectedOptions[0].index)}>
              {locations}
          </select>
      </div>
  )
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
      currentLocation : fromLonLat([-0.12755, 51.507222])
    }
    this.zoomToLocation = this.zoomToLocation.bind(this);
  }

  zoomToLocation(selectedIndex) {
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

