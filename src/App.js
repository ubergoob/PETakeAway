import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import Map from './components/map'


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
