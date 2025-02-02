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
      name="Saturn"
      textureUrl="/saturn_texture.jpg"
      size={58230}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={26.7}
      orbitRadius={5}
      atmosphereColor={"#F4E1B1"}
      A = {1432.041 * 1e6}
      EC = {5.559928887285597E-02}
      i = {2.484368779807340E+00}
      omega = {3.359006492558044E+02}
      Omega = {1.136930130794106E+02}
      meanMotion={.03346}
      j2000MeanAnomaly={3.203798737892262E+02}
      targetId="699"
      hasClouds={false}
    />
    
  ) : null;
}

export default Saturn;
