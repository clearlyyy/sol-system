import React, { useState, useEffect } from "react";
import Planet from "../Planet";
function Neptune(props) {
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
      textureUrl="/neptune_texture.jpg"
      size={3.883}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	4514.953 * 1e6}
      EC = {.0097}
      i = {1.769}
      omega = {44.971}
      Omega = {131.784}
      targetId="899"
    />
    
  ) : null;
}

export default Neptune;
