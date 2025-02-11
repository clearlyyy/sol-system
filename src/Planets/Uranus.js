import React, { useState, useEffect, useRef } from "react";
import Planet from "../CelestialBodys/Planet";
import * as THREE from 'three';

import Miranda from "../Moons/Miranda";
import Ariel from "../Moons/Ariel";
import Umbriel from "../Moons/Umbriel";
import Titania from "../Moons/Titania";
import Oberon from "../Moons/Oberon";


function Uranus({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Uranus"
      textureUrl="/uranus_texture.jpg"
      size={25362}
      rotationSpeed={0.0005}
      color={"#ACE5EE"}
      orbitSpeed={0.002}
      tilt={97.8}
      orbitRadius={5}
      atmosphereColor={"#00B5E2"}
      A={ 2.887319030356802E+09 }
      EC={ 4.578275341337535E-02 }
      i={ 7.722278083166019E-01 }
      omega={ 9.048538744812166E+01 }
      Omega={ 7.402930173479820E+01 }
      meanMotion={ 1.345382485136898E-07 * 86400 }
      j2000MeanAnomaly={ 2.563701189504871E+02 }
      targetId="799"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Ice Giant"}
      description={"Uranus is the seventh planet from the Sun, known for its blue-green color due to methane in its atmosphere. It has a unique tilt, rotating on its side compared to other planets. Uranus is an ice giant with a cold, distant atmosphere of hydrogen, helium, and icy compounds."}
      mass={8.68e25}
      gravity={8.69}
      density={1.27}
      escapeVelocity={21.3}

      setHostPosition={hostPosition}
    
    
    />
      <Miranda hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Ariel hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Umbriel hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Titania hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>
      <Oberon hostPosition={hostPosition} userControlsRef={userControlsRef}  position={[0,0,0]} daysSinceJ2000={daysSinceJ2000}/>




    </>
    
  ) : null;
}

export default Uranus;
