import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapOverlay = React.forwardRef((props, ref) => {
  const mapRef = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current = {
        setView: (lat, lng) => {
          mapRef.current.setView([lat, lng]);
        },
      };
    }
  }, [ref]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={map => (mapRef.current = map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  );
});

export default MapOverlay;
