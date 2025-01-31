import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Pluto(props) {
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
      textureUrl="/pluto_texture.jpg"
      size={3}
      rotationSpeed={0.0005}
      color={"brown"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"brown"}
      A = {	5869.656 * 1e6}
      EC = {.2488}
      i = {17.141}
      omega = {224.066}
      Omega = {110.303}
      targetId="999"
    />
    
  ) : null;
}

export default Pluto;
