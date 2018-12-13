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
        this.olMap = null;
        this.setMapRef = element => {
          this.mapRef = element;
        }      
    }
      
    render() {
        const styles = { height: '50%', width: '50%'}
        return(
            <div style={styles} ref={this.setMapRef}></div>
        )
    }

    componentWillUpdate(nextProps) {
      const mapView = this.olMap.getView();
      mapView.animate({
        center: nextProps.currentLocation,
        duration: 2000
      });
    }

    componentDidMount() {
        const mapDOMNode = ReactDOM.findDOMNode(this.mapRef);
        this.olMap = new Map({
            target: mapDOMNode,
            layers: [
              new TileLayer({
                source: new OSM()
              })
            ],
            view: new View({
              center: this.props.currentLocation,
              zoom: 8
            })
          });
    }

}

export default MapComponent

