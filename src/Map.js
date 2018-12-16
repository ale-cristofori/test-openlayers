import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource} from 'ol/source.js';
import { GeoJSON, KML } from 'ol/format.js';
import { defaults as defaultInteractions, DragAndDrop } from 'ol/interaction.js';
import { Vector as VectorLayer } from 'ol/layer.js';


class MapComponent extends Component {

    constructor (props) {
        super(props);
        this.mapRef = null;
        this.olMap = null;
        this.setMapRef = element => {
          this.mapRef = element;
        };
        this.state = {
          features: []
        };
        this.dragAndDropInteraction = new DragAndDrop({
          formatConstructors: [
            GeoJSON,
            KML
          ]
        });
        this.uploadFeatsSrc = new VectorSource({
          features: this.state.features
        });
        this.uploadLayer = new VectorLayer({
          source: this.uploadFeatsSrc,
          name: 'uploadLayer'
        });

    }
      
    render() {
        const styles = { height: '50%', width: '50%'}
        return(
            <div style={styles} ref={this.setMapRef}></div>
        )
    }

    componentWillUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        const mapView = this.olMap.getView();
        mapView.animate({
          center: nextProps.currentLocation,
          duration: 2000
        });
      }
      if (nextState.features !== this.state.features) {
        this.uploadLayer.getSource().clear();
        const olFeats = []
        nextState.features.forEach(element => {
          olFeats.push(new GeoJSON().readFeature(element));
        });
        this.uploadFeatsSrc = new VectorSource({
          features: olFeats
        });
        this.uploadLayer.setSource(this.uploadFeatsSrc);
        this.uploadLayer.getSource().refresh();
      }
    }

    componentDidMount() {
        const mapDOMNode = ReactDOM.findDOMNode(this.mapRef);
        this.olMap = new Map({
            interactions: defaultInteractions().extend([this.dragAndDropInteraction]),
            target: mapDOMNode,
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              this.uploadLayer
            ],
            view: new View({
              center: this.props.currentLocation,
              zoom: 8
            })
        });

        this.dragAndDropInteraction.on('addfeatures', (event) => {
            const eventFeatures = event.features;
            const GeoJSONFeats = [];
            eventFeatures.forEach(element => {
              GeoJSONFeats.push(new GeoJSON().writeFeature(element))
            });
            const newStateFeatures = this.state.features.concat(GeoJSONFeats)
            this.setState({
              features: newStateFeatures
            })
        });
    }

}

export default MapComponent

