import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import * as THREE from 'three';

import Triton from "../Moons/Triton";

function Neptune({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Neptune"
      textureUrl="/neptune_texture.jpg"
      size={24622}
      rotationSpeed={0.0005}
      color={"#2D5B9A"}
      orbitSpeed={0.002}
      tilt={28.5}
      orbitRadius={5}
      atmosphereColor={"#4B7F9A"}
      initA={ 4.514059315175322E+09 }
      initEC={ 1.245084205819332E-02 }
      initi={ 1.774960464801212E+00 }
      initomega={ 2.690615092816622E+02 }
      initOmega={ 1.319527478357895E+02 }
      initmeanMotion={ 6.882381472728602E-08 * 86400 }
      j2000MeanAnomaly={ 3.189794970194312E+02 }
      j2000Rotation={284.003736}
      siderealPeriod={16.11}
      targetId="899"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Ice Giant"}
      description={"Neptune is the eighth planet from the Sun, famous for its deep blue color, caused by methane in its atmosphere. It is an ice giant with strong winds, the fastest in the solar system, and has a stormy climate. Neptune is known for its dark, cold environment and a system of moons and rings."}
      mass={1.02e26}
      gravity={11.15}
      density={1.638}
      escapeVelocity={23.5}

      setHostPosition={hostPosition}

      meanTempDay={-201}
      meanTempNight={-201}
    
    />
    <Triton hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
    </>
  ) : null;
}

export default Neptune;
