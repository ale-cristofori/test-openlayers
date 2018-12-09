import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

class MapComponent extends Component {

    constructor (props) {
        super(props);
        this.mapRef = null;
        this.setMapRef = element => {
          this.mapRef = element;
        }
      }

    render() {
        const styles = { height: '100%', width: '100%'}
        return(
            <div style={styles} ref={this.setMapRef}></div>
        )
    }

    componentDidMount() {
        const mapDOMNode = ReactDOM.findDOMNode(this.mapRef);
        new Map({
            target: mapDOMNode,
            layers: [
              new TileLayer({
                source: new OSM()
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          });
    }

}

export default MapComponent

