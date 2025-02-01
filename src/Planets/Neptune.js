import React, { useState, useEffect } from "react";
import Planet from "../Planet";
function Neptune(props, scalingFactor) {
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
      name="Neptune"
      textureUrl="/neptune_texture.jpg"
      size={1.159}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	4514.953 * 1e6}
      EC = {1.114797945577682E-02}
      i = {1.773472322935706E+00}
      omega = {2.668221317471495E+02}
      Omega = {1.317693429431158E+02}
      meanMotion={.00601}
      j2000MeanAnomaly={2.666047613305240E+02}
      targetId="899"
      scalingFactor={scalingFactor}
    />
    
  ) : null;
}

export default Neptune;
