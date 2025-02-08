import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";

function Venus({daysSinceJ2000, userControlsRef, ...props}) {
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
      distanceThreshold={48}
      name="Venus"
      textureUrl="/venus_texture.jpg"
      size={6052}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={177.4}
      orbitRadius={5}
      atmosphereColor={"#C2B280"}
      A = {108.21 * 1e6}
      EC = {6.755697268576816E-03}
      i = {3.394589632757466E+00}
      omega = {5.518541504725159E+01}
      Omega = {7.667837511094160E+01}
      meanMotion={1.60213}
      j2000MeanAnomaly={50.446}
      targetId="299"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Terrestrial"}
      description={"Venus is the second planet from the Sun, often called Earth's 'sister planet' due to its similar size and composition. However, its thick atmosphere, composed mainly of carbon dioxide, creates an extreme greenhouse effect, making it the hottest planet in the solar system. Its surface is hidden by dense clouds of sulfuric acid."}
    />
    
  ) : null;
}

export default Venus;
