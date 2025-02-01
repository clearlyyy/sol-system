import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Uranus(props, scalingFactor) {
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
      name="Uranus"
      textureUrl="/uranus_texture.jpg"
      size={1.195}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	2867.043 * 1e6}
      EC = {4.439367187710320E-02}
      i = {7.723813829207361E-01}
      omega = {9.660797275005378E+01}
      Omega = {7.396291773291530E+01}
      meanMotion={.01190}
      j2000MeanAnomaly={1.429079296754021E+02}
      targetId="799"
      scalingFactor={scalingFactor}
    />
    
  ) : null;
}

export default Uranus;
