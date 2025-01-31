import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Saturn(props) {
  const { delay = 0 } = props; // Default delay is 0 if not provided
    const [loaded, setLoaded] = useState(false);
  
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
      textureUrl="/saturn_texture.jpg"
      size={9.449}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"orange"}
      A = {1432.041 * 1e6}
      EC = {.0565}
      i = {2.485}
      omega = {92.431}
      Omega = {113.665}
      targetId="699"
    />
    
  ) : null;
}

export default Saturn;
