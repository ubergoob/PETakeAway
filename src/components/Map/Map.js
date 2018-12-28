import React from 'react';
import L from 'leaflet';
import mapStyles from './mapCss'

const tileSources = require('../../config.json').tileSources
const dataFiles = require('../../config.json').dataFiles
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
      mapCenter: [37.541885, -77.440624],
      incidentList: [],
      incidentMarkers: []
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
    // adding layers
    this.markerLayer = L.layerGroup().addTo(this.map)
    this.polyLayer = L.layerGroup().addTo(this.map)
    // add initial markers
    this.incidents = this._buildMarkers()
    this.setState({incidentList: this.incidents})
    // add event listeners
    this.map.on('moveend', () => {console.log(this.state.incidentMarkers[0])})//{this.setState({mapCenter: [this.map.getCenter().lat, this.map.getCenter().lng]})})
  }

  _buildMarkers = () => {
    //get markers. Stored in local json files for now. Filenames are entered in config file: 
    this.markerLayer.clearLayers()
    let incidents = []
    let markers = []
    dataFiles.forEach(item => {
      let incident = require('../../data/'+ item)
      let url = 'http://gis.richmondgov.com/ArcGIS/rest/services/StatePlane4502/Ener/MapServer/0/query?geometry=' + incident.address.longitude + ',' + incident.address.latitude + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&outFields=*&f=pjson'
      const details = async (incident) => {
        const response = await fetch(url, {crossDomain: true})
        const json = await response.json()
        incident.additionalData = json
        
        // create the marker
        markers.push(L.marker([incident.address.latitude, incident.address.longitude], {icon: baseIcon, alt: 'fire'})
        .addTo(this.markerLayer)
        .bindPopup(incident.address.common_place_name))
      }
      details(incident) 
      incidents.push(incident)
    })
    this.setState({incidentMarkers: markers})
    return (incidents)
  }

  _createListLegend = () => {
    const listIncidents = this.state.incidentList.map((incident) => 
      <li 
      key={incident.description.incident_number} 
      onClick={() => this._moveMap([incident.address.latitude, incident.address.longitude])}
      >{incident.address.common_place_name}</li>
    )
    return (
      <ul style={mapStyles.ListItems}>{listIncidents}</ul>
    )
  }

  _moveMap(point) {
    this.map.flyTo(point)
  }

  render() {
    return <div>
      <div id="map" style={{height: '100vh'}}></div>
      <div style={mapStyles.MapLegend}>INCIDENTS  {this._createListLegend()}</div>
    </div>
  }
}
export default Map;