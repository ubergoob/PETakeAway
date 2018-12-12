import React from 'react';
import L from 'leaflet';

const tileSources = require('../config.json').tileSources
let activeTile = tileSources[tileSources.active]

const mapTiles = activeTile.tiles + activeTile.accessToken;
const mapAttribution = activeTile.attribution;
const mapCenter = [37.541885, -77.440624];
const zoomLevel = 13;


class Map extends React.Component {

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
  }



  render() {
    return <div id="map" style={{height: '100vh'}}></div>
  }
}
export default Map;