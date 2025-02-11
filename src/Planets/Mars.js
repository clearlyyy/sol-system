import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import Deimos from "../Moons/Deimos"
import Phobos from "../Moons/Phobos"
import * as THREE from 'three';
function Mars({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Mars"
      textureUrl="/mars_texture.jpg"
      size={3396}
      rotationSpeed={0.012}
      color={"#B84E36"}
      orbitSpeed={0.0007}
      tilt={25.2}
      orbitRadius={15}
      atmosphereColor={"#D14F2A"}
      A={227.956*1e6}
      EC={9.345086660118830E-02}
      i={1.847563958444007E+00} // tilt
      omega={2.865373583154345E+02}
      Omega={4.956199905920329E+01}
      meanMotion={.52403}
      j2000MeanAnomaly={19.09}
      targetId="499"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Terrestrial"}
      description={"Mars is the fourth planet from the Sun, known for its red color due to iron oxide on its surface. It has a thin atmosphere and features such as valleys, deserts, and the largest volcano in the solar system, Olympus Mons. It's a prime candidate for potential human exploration."}
      mass={6.42e23}
      gravity={3.71}
      density={3.93}
      escapeVelocity={5.03}

      setHostPosition={hostPosition}
    
    >
      </Planet>
      <Phobos hostPosition={hostPosition}  userControlsRef={userControlsRef} daysSinceJ2000={daysSinceJ2000}/>
      <Deimos hostPosition={hostPosition}  userControlsRef={userControlsRef} daysSinceJ2000={daysSinceJ2000}/>
    </>
  ) : null;
}

export default Mars;
