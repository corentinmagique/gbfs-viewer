import React, {useEffect, useState} from 'react';

import useGbfs  from './Loader/useGbfs';
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';

const App = () : React.JSX.Element => {

  const {loading, status, gbfs } = useGbfs("https://pittsburgh.publicbikesystem.net/customer/gbfs/v2/gbfs.json");
  // const map = useMap();

  // useEffect(()=>{
  //   map.fitBounds(gbfs?.mapBounds);
  // }, [loading])
  return (
    <div className="App">
      <MapContainer style={{width: "100%", height: "100%"}} zoom={13} bounds={gbfs?.mapBounds} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {
      gbfs?.stationInformations.stations.map((station, index)=>
      <Marker key={index} position={[station.lat, station.lon]}>
        <Popup>
          {station.name} <br/> (Available bike : {gbfs.stationStatus.has(station.station_id) ? `${gbfs.stationStatus.get(station.station_id)?.num_bikes_available} / ${station.capacity}` : 0})
        </Popup>
      </Marker>
      )
    }
    
</MapContainer>
      {/* {
        loading ? <h1>Loading ....</h1> : <h1>Loaded !! {status}</h1> 
      }
      {
        !loading && <>
          <h1>Network : {gbfs?.systemInformations.name}</h1>
          <h2>Available languages ({gbfs?.languages?.length}) : </h2>
          <ul>
            {
              gbfs?.languages?.map((lang, index)=>
                <li key={index}>
                  {lang}
                </li>
              )
            }
          </ul>

          <h2>Available stations ({gbfs?.stationInformations.stations.length}) : </h2>
          <ul>
            {
              gbfs?.stationInformations.stations.map((station, index)=>
                <li key={index}>
                  {station.name} (Available bike : {gbfs.stationStatus.has(station.station_id) ? gbfs.stationStatus.get(station.station_id)?.num_bikes_available : 0})
                </li>
              )
            }
          </ul>
        </>
      } */}
    </div>
  );
}

export default App;
