import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Mars(props) {
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
      name="Mars"
      textureUrl="/mars_texture.jpg"
      size={.532}
      rotationSpeed={0.012}
      color={"orange"}
      orbitSpeed={0.0007}
      tilt={25.2}
      orbitRadius={15}
      atmosphereColor={"red"}
      A={227.956*1e6}
      EC={9.345086660118830E-02}
      i={1.847563958444007E+00} // tilt
      omega={2.865373583154345E+02}
      Omega={4.956199905920329E+01}
      meanMotion={.52403}
      j2000MeanAnomaly={19.09}
      targetId="499"
    />
    
  ) : null;
}

export default Mars;
