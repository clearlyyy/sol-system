import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import * as THREE from 'three';
function Mercury({daysSinceJ2000, userControlsRef, ...props}) {
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
      distanceThreshold={2500}
      name="Mercury"
      textureUrl="/mercury_texture.jpg"
      size={2440}
      rotationSpeed={0.012}
      color={"#918273"}
      orbitSpeed={0.0007}
      tilt={0.034}
      orbitRadius={15}
      atmosphereColor={"black"}
      A={ 5.790914908349126E+07 }
      EC={ 2.056377211068672E-01 }
      i={ 7.003482834458984E+00 }
      omega={ 2.919709990340481E+01 }
      Omega={ 4.829968514953469E+01 }
      meanMotion={ 4.736501839898613E-05 * 86400 }
      j2000MeanAnomaly={ 2.717303512882007E+02 }
      j2000Rotation={338.856597}
      siderealPeriod={1407.504}
      targetId="199"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Terrestrial"}
      description={"Mercury is the closest planet to the Sun and has extreme temperature variations, with scorching heat during the day and freezing cold at night. It has a thin atmosphere, making it unable to retain heat. Its surface is heavily cratered, resembling the Moon's."}
      mass={3.30e23}
      gravity={3.7}
      density={5.43}
      escapeVelocity={4.25}

      setHostPosition={hostPosition}

      meanTempDay={430}
      meanTempNight={-180}

    />
    
  ) : null;
}

export default Mercury;
