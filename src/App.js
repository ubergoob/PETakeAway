import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import Map from './components/Map/Map'


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
