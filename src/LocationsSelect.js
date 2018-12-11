import React, { Component } from 'react';
import './LocationsSelect.css';

class LocationsSelect extends Component {

    render() {
        const locations = this.props.locations.map((item, index) => 
        <option key={index} value={item.coords} className="dd-locations">{item.name}</option>
        );
        return(
            <div>
                <select onChange={this.props.onSelectLocation}>
                    {locations}
                </select>
            </div>
        )
    }

}

export default LocationsSelect;