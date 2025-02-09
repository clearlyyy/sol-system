import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";
function Neptune({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Neptune"
      textureUrl="/neptune_texture.jpg"
      size={24622}
      rotationSpeed={0.0005}
      color={"#2D5B9A"}
      orbitSpeed={0.002}
      tilt={28.5}
      orbitRadius={5}
      atmosphereColor={"#4B7F9A"}
      A = {	4514.953 * 1e6}
      EC = {1.114797945577682E-02}
      i = {1.773472322935706E+00}
      omega = {2.668221317471495E+02}
      Omega = {1.317693429431158E+02}
      meanMotion={.00601}
      j2000MeanAnomaly={2.666047613305240E+02}
      targetId="899"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Ice Giant"}
      description={"Neptune is the eighth planet from the Sun, famous for its deep blue color, caused by methane in its atmosphere. It is an ice giant with strong winds, the fastest in the solar system, and has a stormy climate. Neptune is known for its dark, cold environment and a system of moons and rings."}
      mass={1.02e26}
      gravity={11.15}
      density={1.638}
      escapeVelocity={23.5}
    
    />
    
  ) : null;
}

export default Neptune;
