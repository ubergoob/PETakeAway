import React from 'react';
import L from 'leaflet';

const tileSources = require('../config.json').tileSources
let activeTile = tileSources[tileSources.active]

const mapTiles = activeTile.tiles + activeTile.accessToken;
const mapAttribution = activeTile.attribution;
const mapCenter = [37.541885, -77.440624];
const zoomLevel = 13;

let baseIcon = L.icon({
  iconUrl: require('../markers/fire.png'),
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
    const incident = require('../data/F01705150050.json')
    // collect some more data on location
    this._getAdditionalData(incident)
  }

  _getAdditionalData = function(incident) {
    let url = 'http://gis.richmondgov.com/ArcGIS/rest/services/StatePlane4502/Ener/MapServer/0/query?geometry=' + incident.address.longitude + ',' + incident.address.latitude + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&outFields=*&f=pjson'
      console.log(url)
      fetch(url, {
        crossDomain: true,
        mode: 'no-cors'
      })
      .then(response => response.json())
      .then(jsonResp => {incident.additionalData = jsonResp; this.setState({marker: incident})})
      .catch (err => console.log(err))
      //incident.additionalData = jsonResp

      this._placeMarker(incident)
    
  
  }
  
  _placeMarker = (incident) => {
    console.log("did we attempt this?")
    console.log(incident)
    // just addin markers for the moment, will perdy-fy them in a bit.
    console.log(incident)
    this.marker = L.marker([incident.address.latitude, incident.address.longitude], {icon: baseIcon}).addTo(this.layer)
  }

  render() {
    return <div id="map" style={{height: '100vh'}}></div>
  }
}
export default Map;