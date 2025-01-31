import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Venus(props) {
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
      textureUrl="/venus_texture.jpg"
      size={.949}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"orange"}
      A = {108.21 * 1e6}
      EC = {.0068}
      i = {3.395}
      omega = {54.884}
      Omega = {76.680}
      targetId="299"
    />
    
  ) : null;
}

export default Venus;
