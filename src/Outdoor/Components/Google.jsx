import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function Google({ data }) {
    const defaultLocation = { lat: 42.73, lng: -73.68 };
    const [markers, setMarkers] = useState([defaultLocation]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const markerPositions = await Promise.all(
                Object.values(data).map(async (locations) => {
                    const location = locations[0].location; // Assuming each location array has only one entry
                    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=process.env.REACT_APP_GOOGLE_MAPS_API_KEY`);
                    const data = await response.json();
                    const { lat, lng } = data.results[0].geometry.location;
                    return { lat, lng };
                })
            );
            setMarkers([defaultLocation, ...markerPositions]);
        };

        fetchCoordinates();
    }, [data, defaultLocation]);

  const mapStyles = {
    width: '100%',
    height: '400px',
    position: 'relative'
  };

  return (
    <APIProvider apiKey={'process.env.REACT_APP_GOOGLE_MAPS_API_KEY'}>
      <div style={mapStyles}>
        <Map
          center={markers.length > 0 ? markers[0] : { lat: 0, lng: 0 }} // Centering map based on the first marker's position
          zoom={10}
          google={{ styles: mapStyles }}
        >
          {markers.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

export default Google;