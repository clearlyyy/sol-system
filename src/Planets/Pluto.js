import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import * as THREE from 'three';

function Pluto({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Pluto"
      textureUrl="/pluto_texture.jpg"
      size={1188.5}
      rotationSpeed={0.0005}
      color={"#D6A689"}
      orbitSpeed={0.002}
      tilt={120.5}
      orbitRadius={5}
      atmosphereColor={"black"}
      A={ 5.932548642959757E+09 }
      EC={ 2.501324112782218E-01 }
      i={ 1.736678729503515E+01 }
      omega={ 1.144829790737675E+02 }
      Omega={ 1.104677676773093E+02 }
      meanMotion={ 4.567898962415817E-08 * 86400 }
      j2000MeanAnomaly={ 5.049381029769149E+01 }
      j2000Rotation={79.520297}
      siderealPeriod={153}
      targetId="999"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Dwarf Planet"}
      description={"Pluto is a small, icy body located in the Kuiper Belt beyond Neptune. Once considered the ninth planet, it is now classified as a dwarf planet. Pluto has a highly elliptical orbit and is known for its reddish-brown surface, frozen methane, and a complex system of five moons."}
      mass={1.31e22}
      gravity={0.62}
      density={1.86}
      escapeVelocity={1.3}

      setHostPosition={hostPosition}

      meanTempDay={-218}
      meanTempNight={-240}
    
    />
    
  ) : null;
}

export default Pluto;
