import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import * as THREE from 'three';

function Venus({daysSinceJ2000, userControlsRef, ...props}) {
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
    <Planet
      {...props}
      userControlsRef={userControlsRef}
      distanceThreshold={3000}
      name="Venus"
      textureUrl="/venus_texture.jpg"
      size={6052}
      rotationSpeed={0.0005}
      color={"#E7C27E"}
      orbitSpeed={0.002}
      tilt={177.4}
      orbitRadius={5}
      atmosphereColor={"#EED6A4"}
      A={ 1.082091114849111E+08 }
      EC={ 6.746020028596929E-03 }
      i={ 3.394369649329146E+00 }
      omega={ 5.506922965951486E+01 }
      Omega={ 7.661172857123719E+01 }
      meanMotion={ 1.854313817536282E-05 * 86400 }
      j2000MeanAnomaly={ 3.458433182420262E+02 }
      j2000Rotation={42.432535}
      siderealPeriod={5832.443616}
      targetId="299"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Terrestrial"}
      description={"Venus is the second planet from the Sun, often called Earth's 'sister planet' due to its similar size and composition. However, its thick atmosphere, composed mainly of carbon dioxide, creates an extreme greenhouse effect, making it the hottest planet in the solar system. Its surface is hidden by dense clouds of sulfuric acid."}

      mass={4.87e24}
      gravity={8.87}
      density={5.24}
      escapeVelocity={10.36}

      setHostPosition={hostPosition}

      meanTempDay={465}
      meanTempNight={465}
    />
    
  ) : null;
}

export default Venus;
