import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import Io from "../Moons/Io"
import Europa from "../Moons/Europa"
import Ganymede from "../Moons/Ganymede"
import Callisto from "../Moons/Callisto"
import * as THREE from 'three';
function Jupiter({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Jupiter"
      textureUrl="/jupiter_texture.jpg"
      size={69911}
      color={"#D9A066"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3.1}
      orbitRadius={30}
      atmosphereColor={"#B88A5D"}
      initA={ 7.785141078475046E+08 }
      initEC={ 4.840876272029049E-02 }
      initi={ 1.303348969589005E+00 }
      initomega={ 2.738489166292620E+02 }
      initOmega={ 1.005214898855339E+02 }
      initmeanMotion={ 9.613596887355097E-07 * 86400 }
      j2000MeanAnomaly={ 6.214731499421698E+01 }
      j2000Rotation={188.147221}
      siderealPeriod={9.925}
      targetId="599"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Gas Giant"}
      description={"Jupiter is the fifth planet from the Sun and the largest in our solar system. Known for its massive size, powerful storms, and striking Great Red Spot, Jupiter is a gas giant with a predominantly hydrogen and helium composition. It has a strong magnetic field, numerous moons, and a ring system, making it a fascinating and dynamic planet in the outer solar system."}
      mass={1.90e27}
      gravity={24.79}
      density={1.33}
      escapeVelocity={59.5}

      setHostPosition={hostPosition}

      meanTempDay={-145}
      meanTempNight={-145}
    
    >
      </Planet>
      <Io hostPosition={hostPosition}  userControlsRef={userControlsRef} position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Europa hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Ganymede hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Callisto hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
    </>
  ) : null;
}

export default Jupiter;
