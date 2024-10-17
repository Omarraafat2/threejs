import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane, Box, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Land = () => (
  <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} args={[100, 100]}>
    <meshStandardMaterial attach="material" color="green" />
  </Plane>
);

const Window = ({ position, onClick, isActive }) => (
  <Box
    castShadow
    position={position}
    args={[0.6, 0.5, 0.05]}
    onClick={onClick}
    onPointerOver={(e) => e.object.scale.set(1.1, 1.1, 1.1)} // Hover scale up
    onPointerOut={(e) => e.object.scale.set(1, 1, 1)} // Hover scale back
  >
    <meshStandardMaterial
      attach="material"
      color={isActive ? 'yellow' : 'lightblue'}
      transparent
      opacity={0.6}
    />
  </Box>
);

const Sign = ({ texture, onClick }) => (
  <Box
    position={[0, 4.8, 1.6]}
    args={[6, 0.5, 0.6]}
    receiveShadow
    onClick={onClick}
    onPointerOver={(e) => e.object.scale.set(1.05, 1.05, 1.05)} 
    onPointerOut={(e) => e.object.scale.set(1, 1, 1)} 
  >
    <meshStandardMaterial attach="material" map={texture} />
  </Box>
);

const InteractiveCommercialBuilding = () => {
  const [activeWindow, setActiveWindow] = useState(null);
  const [signTexture, setSignTexture] = useState(null);
  const skinBilding = useTexture('/Windows_normal.png');



  const handleWindowClick = (index) => {
    if (activeWindow === index) {
      setActiveWindow(null);
    } else {
      setActiveWindow(index);
    }
    console.log(`Window ${index} clicked!`);
  };

  const handleSignClick = () => {
    console.log('Sign clicked!');
    alert('Sign clicked!');
  };

  return (
    <group>
      {/* Main building structure */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          castShadow
          position={[0, index * 1, 0]}
          args={[8, 1.2, 4]}
        >
          <meshStandardMaterial attach="material" map={skinBilding} />
        </Box>
      ))}


      {/* Roof */}
      <Box castShadow position={[0, 4.6 + 0.25, 0]} args={[8, 0.5, 4]}>
  <meshStandardMaterial attach="material" color="darkgray" />
</Box>
      {/* Door */}
      <Box castShadow position={[0, 0.3, 2]} args={[1, 1.5, 0.1]}>
        <meshStandardMaterial attach="material" color="brown" />
      </Box>

    
{/* Windows with click interaction */}
{Array.from({ length: 4 }).map((_, index) => (
  <React.Fragment key={index}>
    {/* Ignore windows for the first floor (index === 0) */}
    {index !== 0 && (
      <>
        {/* Front windows */}
        <Window
          position={[-3.2, index * 1 + 1, 2]} // Continue as normal for other floors
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[-1.8, index * 1 + 1, 2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[3.2, index * 1 + 1, 2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[1.8, index * 1 + 1, 2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        {/* Back windows */}
        <Window
          position={[-3.2, index * 1 + 1, -2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[-1.8, index * 1 + 1, -2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[3.2, index * 1 + 1, -2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
        <Window
          position={[1.8, index * 1 + 1, -2]}
          onClick={() => handleWindowClick(index)}
          isActive={activeWindow === index}
        />
      </>
    )}
  </React.Fragment>
))}



    

      {/* Interior Walls */}
      {Array.from({ length: 4 }).map((_, index) => (
  <React.Fragment key={index}>
    {/* Vertical wall inside the building - left side */}
    <Box
      position={[-2.5, index * 1 + 0.5, 0]} // Adjust position for left side
      args={[0.1, 2, 3.5]}  // Width, Height, Depth
      castShadow
    >
      <meshStandardMaterial attach="material" color="lightgray" />
    </Box>

    {/* Vertical wall inside the building - right side */}
    <Box
      position={[2.5, index * 1 + 0.5, 0]} // Adjust position for right side
      args={[0.1, 2, 3.5]}  // Width, Height, Depth
      castShadow
    >
      <meshStandardMaterial attach="material" color="lightgray" />
    </Box>

    {/* Horizontal wall inside the building - center */}
    <Box
      position={[0, index * 1 + 0.5, 0]}  // Center position for horizontal wall
      args={[5, 2, 0.1]}  // Width, Height, Depth
      castShadow
    >
      <meshStandardMaterial attach="material" color="lightgray" />
    </Box>
  </React.Fragment>
))}

    </group>
  );
};

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [5, 5, 10], fov: 80 }}>
      <OrbitControls />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Land />
      <InteractiveCommercialBuilding />
    </Canvas>
  );
};

export default Scene;
