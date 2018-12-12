import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import Map from './components/map'


// const accessToken = 'pk.eyJ1IjoidWJlcmdvb2JlciIsImEiOiJjaWhhMTI2OWgwdWM3djBraW8xemhvN3I3In0.ktCF1Ra_hOXeQkBwLkCo2g'
// const stamenTonerTiles = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken;
// const stamenTonerAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// const mapCenter = [39.9528, -75.1638];
// const zoomLevel = 12;


class App extends Component {
  render() {
    return (
  <div>
      <Map></Map>

  </div>
    );
  }
}


export default App;
