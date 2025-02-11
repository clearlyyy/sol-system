import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import Luna from "../Moons/Luna";
import { CSS3DObject } from '@react-three/drei';

import * as THREE from 'three';

function Earth({daysSinceJ2000, userControlsRef, ...props}) {
  const { delay = 0 } = props; // Default delay is 0 if not provided
  const [loaded, setLoaded] = useState(false);

  const hostPosition = useRef(new THREE.Vector3(0,0,0));
  
  // Use useEffect to trigger the delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [delay]);



  // Render the Planet component only after the delay
  
  return loaded ? (
    <>
    <Planet
      {...props}
      userControlsRef={userControlsRef}
      distanceThreshold={3000}
      name="Earth"
      textureUrl="/earth_texture.jpg"
      size={6371}
      color={"#2E52A3"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.4}
      orbitRadius={44}
      atmosphereColor={0x0099dd}
      A={ 1.494709115619970E+08 }
      EC={ 1.598186960159255E-02 }
      i={ 4.352245199042271E-03 }
      omega={ 2.938912434425752E+02 }
      Omega={ 1.675963295196312E+02 }
      meanMotion={ 1.142205052753467E-05 * 86400 }
      j2000MeanAnomaly={ 3.948832849013939E+01 }
      targetId="399"
      hasClouds={true}
      daysSinceJ2000={daysSinceJ2000}
      type={"Terrestrial"}
      description={"Earth is the third planet from the Sun and the only known celestial body that supports life. Its diverse ecosystems, rich atmosphere, and liquid water make it unique in the universe."}

      mass={5.97e24}
      gravity={9.81}
      density={5.51}
      escapeVelocity={11.19}
      setHostPosition={hostPosition}

    >
      </Planet>
      <Luna hostPosition={hostPosition} userControlsRef={userControlsRef} daysSinceJ2000={daysSinceJ2000} />
      </>
      
  ) : null; // Don't render anything before the delay
  
}

export default Earth;
