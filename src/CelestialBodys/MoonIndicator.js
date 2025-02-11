import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from 'three';

import '../styles/indicators.css'
import { object } from "framer-motion/client";

function MoonIndicator({name, color, userControlsRef, hostPosition, distanceThreshold}) {
  const ref = useRef();
  const textRef = useRef();
  const { camera, scene } = useThree();

  const [planetObject, setPlanetObject] = useState(null);
  const [isDissolved, setIsDissolved] = useState(false);


  //Find the planet objects mesh.
  useEffect(() => {
    setPlanetObject(scene.getObjectByName(name));
  }, [name, scene])

  //Check if camera is far away from object, if so dissolve the circle.
  useFrame(() => {
    if (planetObject) {
      const objectPosition = new THREE.Vector3(0,0,0);
      planetObject.getWorldPosition(objectPosition);
      const distanceToPlanet = camera.position.distanceTo(objectPosition);
      
      if (distanceToPlanet > 10) {
          setIsDissolved(true);
      }
      else {
        setIsDissolved(false);
      }
      
    }
  });

  const handlePlanetClick = useCallback(() => {
    console.log("Clicked!");
    userControlsRef.current.selectBody(planetObject);
  }, [planetObject, userControlsRef])

  return (
        <Html>   
          <div onClick={handlePlanetClick} className={`circle-container ${isDissolved ? 'dissolved' : ''}`} 
          style={{'--circle-border-color': color}}/>
          <div className={`text-above ${isDissolved ? 'dissolved' : ''}`}  >{name}</div>    
        </Html>
  );
}

export default MoonIndicator;
