import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";

import Mimas from "../Moons/Mimas";
import Enceladus from "../Moons/Enceladus";
import Tethys from "../Moons/Tethys";
import Dione from "../Moons/Dione";
import Rhea from "../Moons/Rhea";
import Titan from "../Moons/Titan";


import * as THREE from 'three';

function Saturn({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Saturn"
      textureUrl="/saturn_texture.jpg"
      size={58230}
      rotationSpeed={0.0005}
      color={"#e2bf7d"}
      orbitSpeed={0.002}
      tilt={26.7}
      orbitRadius={5}
      atmosphereColor={"#F4E1B1"}
      A={ 1.429815962622609E+09 }
      EC={ 5.537129625010676E-02 }
      i={ 2.488916875118528E+00 }
      omega={ 3.368250431033135E+02 }
      Omega={ 1.136666573187736E+02 }
      meanMotion={ 3.861182175316644E-07 * 86400 }
      j2000MeanAnomaly={ 2.666107526968741E+02 }
      j2000Rotation={79.520297}
      siderealPeriod={10.7}
      targetId="699"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Gas Giant"}
      description={"Saturn is the sixth planet from the Sun, famous for its stunning rings made of ice and rock. It is a gas giant with a thick atmosphere of hydrogen and helium, and it has over 80 moons, including Titan, the second-largest moon in the solar system."}
      mass={5.68e26}
      gravity={10.44}
      density={0.687}
      escapeVelocity={35.5}

      setHostPosition={hostPosition}

      meanTempDay={-178}
      meanTempNight={-178}
    
    >
      </Planet>
      <Mimas hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Enceladus hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Tethys hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Dione hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Rhea hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Titan hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
    </>
    
  ) : null;
}

export default Saturn;
