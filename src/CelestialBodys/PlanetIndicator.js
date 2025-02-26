import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { useRef, useEffect, useCallback, useState } from "react";

import { planetScaling } from "../App";

import '../styles/indicators.css'

function PlanetIndicator({name, color, userControlsRef, distanceThreshold}) {
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
        const distance = camera.position.length();
        const distanceToPlanet = camera.position.distanceTo(planetObject.position);
        if (distance > distanceThreshold) {
            setIsDissolved(true);
        }
        else if (distanceToPlanet < 2)
        {
            setIsDissolved(true);
        } else {
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

export default PlanetIndicator;
