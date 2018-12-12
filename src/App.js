import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

const accessToken = 'pk.eyJ1IjoidWJlcmdvb2JlciIsImEiOiJjaWhhMTI2OWgwdWM3djBraW8xemhvN3I3In0.ktCF1Ra_hOXeQkBwLkCo2g'
const stamenTonerTiles = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken;
const stamenTonerAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;



class App extends Component {
  render() {
    return (
  <div>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossOrigin=""/>
    <Map
      
      center={mapCenter}
      zoom={zoomLevel}
    >
    <TileLayer
      attribution={stamenTonerAttr}
      url={stamenTonerTiles}
    />
    </Map>


  </div>
    );
  }
}

export default App;
