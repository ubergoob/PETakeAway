import React from 'react';
import L from 'leaflet';
import {getAdditionalData} from './mapHelper'

const tileSources = require('../../config.json').tileSources
let activeTile = tileSources[tileSources.active]

const mapTiles = activeTile.tiles + activeTile.accessToken;
const mapAttribution = activeTile.attribution;
const mapCenter = [37.541885, -77.440624];
const zoomLevel = 13;

let baseIcon = L.icon({
  iconUrl: require('./markers/fire.png'),
  iconSize: [32, 37],
  popupAnchor: [-3, -76]
})

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: null
    }
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: mapCenter,
      zoom: zoomLevel,
      layers: [
        L.tileLayer(mapTiles, {
          attribution: mapAttribution
        }),
      ]
    });
    // adding marker layer
    this.layer = L.layerGroup().addTo(this.map)
    // add initial markers
    this._addMarkers()
  }

  _addMarkers = () => {
    this.layer.clearLayers();
    //get markers. Stored in local json files for now:
    const incident = require('../../data/F01705150050.json')
    // collect some more data on location
    getAdditionalData(incident, this)
  }


  
  _placeMarker = (incident) => {
    // just addin markers for the moment, will perdy-fy them in a bit.
    //console.log(incident)
    this.marker = L.marker([incident.address.latitude, incident.address.longitude], {icon: baseIcon, alt: 'fire'}).addTo(this.layer)
  }

  render() {
    return <div id="map" style={{height: '100vh'}}></div>
  }
}
export default Map;