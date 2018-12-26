import React from 'react';
import L from 'leaflet';
import {getAdditionalData} from './mapHelper'
import mapStyles from './mapCss'

const tileSources = require('../../config.json').tileSources
let activeTile = tileSources[tileSources.active]

const mapTiles = activeTile.tiles + activeTile.accessToken;
const mapAttribution = activeTile.attribution;
const mapCenter = [37.541885, -77.440624];
const zoomLevel = 13;

let baseIcon = L.icon({
  iconUrl: require('./markers/fire.png'),
  iconSize: [32, 37],
  popupAnchor: [0, -28]
})


class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: null,
      mapCenter: [37.541885, -77.440624]
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
    this.markerLayer = L.layerGroup().addTo(this.map)
    // add initial markers
    this._addMarkers()
    // add event listeners
    this.map.on('moveend', () => {this.setState({mapCenter: [this.map.getCenter().lat, this.map.getCenter().lng]})})
  }

  _addMarkers = () => {
    this.markerLayer.clearLayers();
    //get markers. Stored in local json files for now: 
    const incident = require('../../data/F01705150050.json')

    // collect some more data on location
    // Extracting this call to it's own module as it could be extracted to an API to "hide" data source.
    // Passing 'this' to the module although it wouldn't be passed to an API. This is because if we called an API
    // for same data, then we would utilize 'this' in the promise locally as we do in the library.
    // this would most likely still have some refactoring to minimize sent payload. Currently would only need
    // to send lat/long
    getAdditionalData(incident, this)
  }


  
  _placeMarker = (incident) => {
    // just addin markers for the moment, will perdy-fy them in a bit.
    L.marker([incident.address.latitude, incident.address.longitude], {icon: baseIcon, alt: 'fire'})
    .addTo(this.markerLayer)
    .bindPopup(incident.address.common_place_name)
    this.forceUpdate()
  }

  render() {
    return <div>
      <div id="map" style={{height: '100vh'}}></div>
      <div style={mapStyles.MapLegend}>It ain't no thang but a chicken wing!</div>
    </div>
  }
}
export default Map;