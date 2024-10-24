import React from 'react';
import { Box } from '@react-three/drei';

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

export default Window;
