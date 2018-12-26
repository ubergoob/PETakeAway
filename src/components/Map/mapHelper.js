

export const getAdditionalData = function(incident, t) {
  let url = 'http://gis.richmondgov.com/ArcGIS/rest/services/StatePlane4502/Ener/MapServer/0/query?geometry=' + incident.address.longitude + ',' + incident.address.latitude + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&outFields=*&f=pjson'
    console.log(url)
    fetch(url, {
      crossDomain: true
    })
    .then(response => response.json())
    .then(jsonResp => {incident.additionalData = jsonResp; t.setState({marker: incident})})
    .catch (err => console.log(err))
    //incident.additionalData = jsonResp

    t._placeMarker(incident)
    //return incident
 
}