import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";

function Pluto({daysSinceJ2000, userControlsRef, ...props}) {
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
      userControlsRef={userControlsRef}
      name="Pluto"
      textureUrl="/pluto_texture.jpg"
      size={1188.5}
      rotationSpeed={0.0005}
      color={"brown"}
      orbitSpeed={0.002}
      tilt={120.5}
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
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Dwarf Planet"}
      description={"Pluto is a small, icy body located in the Kuiper Belt beyond Neptune. Once considered the ninth planet, it is now classified as a dwarf planet. Pluto has a highly elliptical orbit and is known for its reddish-brown surface, frozen methane, and a complex system of five moons."}
    />
    
  ) : null;
}

export default Pluto;
