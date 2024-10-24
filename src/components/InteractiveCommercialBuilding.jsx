import React, { useState } from 'react';
import { Box, useTexture } from '@react-three/drei';
import Window from './Window';

const InteractiveCommercialBuilding = () => {
  const [activeWindow, setActiveWindow] = useState(null);
  const skinBilding = useTexture('/Windows_normal.png');

  const handleWindowClick = (index) => {
    if (activeWindow === index) {
      setActiveWindow(null);
    } else {
      setActiveWindow(index);
    }
    console.log(`Window ${index} clicked!`);
  };

  return (
    <group>
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

      <Box castShadow position={[0, 4.6 + 0.25, 0]} args={[8, 0.5, 4]}>
        <meshStandardMaterial attach="material" color="darkgray" />
      </Box>
      
      <Box castShadow position={[0, 0.3, 2]} args={[1, 1.5, 0.1]}>
        <meshStandardMaterial attach="material" color="brown" />
      </Box>

      {Array.from({ length: 4 }).map((_, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <>
              <Window
                position={[-3.2, index * 1 + 1, 2]}
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
            </>
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

export default InteractiveCommercialBuilding;
