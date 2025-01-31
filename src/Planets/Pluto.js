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
      name="Pluto"
      textureUrl="/pluto_texture.jpg"
      size={3}
      rotationSpeed={0.0005}
      color={"brown"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"brown"}
      A = {	5869.656 * 1e6}
      EC = {2.478572758892915E-01}
      i = {1.716588400262404E+01}
      omega = { 1.151513716103666E+02}
      Omega = {1.102442370814283E+02}
      meanMotion={.00396}
      j2000MeanAnomaly={1.409339255665693E+01}
      targetId="999"
    />
    
  ) : null;
}

export default Pluto;
