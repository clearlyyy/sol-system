import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Uranus(props) {
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
      textureUrl="/uranus_texture.jpg"
      size={4.007}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	2867.043 * 1e6}
      EC = {.0463}
      i = {0.773}
      omega = {170.954}
      Omega = {74.006}
      targetId="799"
    />
    
  ) : null;
}

export default Uranus;
