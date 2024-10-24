import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import InteractiveCommercialBuilding from './InteractiveCommercialBuilding';
import MapOverlay from './MapOverLay';

const Scene = () => {
  const mapRef = useRef();

  // Function to update the map's camera position
  const handleCameraChange = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng]);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* Adding the map */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, height: '100%', width: '100%' }}>
        <MapOverlay ref={mapRef} />
      </div>
      {/* 3D environment */}
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 80 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <OrbitControls />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <InteractiveCommercialBuilding onWindowClick={handleCameraChange} />
      </Canvas>
    </div>
  );
};

export default Scene;
