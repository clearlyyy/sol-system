import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Planet from "../Planet";
import Luna from "../Moons/Luna";

function ding() {

  console.log("Dinger")
}


function Earth(props) {
  const { delay = 0 } = props; // Default delay is 0 if not provided
  const [loaded, setLoaded] = useState(false);
  
  const objRef = useRef();
  const positionRef = useRef(new THREE.Vector3());
  // Use useEffect to trigger the delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [delay]);

  console.log("WOOOOO", (149.598 * 1e6) / 1.495239195637494e7)

  // Render the Planet component only after the delay
  return loaded ? (
    <Planet
      {...props}
      name="Earth"
      textureUrl="/earth_texture.jpg"
      size={6371}
      color={"cyan"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={'#0099dd'}
      A={149.598 * 1e6}
      EC={0.01704}
      i={	0.000266881}
      omega={297.7671795	}
      Omega={163.9748712}
      meanMotion={.98561}
      j2000MeanAnomaly={358.19}
      targetId="399"
      hasClouds={true}
    >
      <Luna position={[0, 0, 0]} />
      </Planet>
      
  ) : null; // Don't render anything before the delay
  
}

export default Earth;
