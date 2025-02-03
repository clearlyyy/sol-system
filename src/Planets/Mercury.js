import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";

function Mercury({daysSinceJ2000, ...props}) {
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
      name="Mercury"
      textureUrl="/mercury_texture.jpg"
      size={2440}
      rotationSpeed={0.012}
      color={"orange"}
      orbitSpeed={0.0007}
      tilt={0.034}
      orbitRadius={15}
      atmosphereColor={"black"}
      A = {57.909 * 1e6}  // Semi-major axis (AU)
      EC = {2.056302515978038E-01}       // Eccentricity
      i = {7.005014362233553E+00}         // Inclination (degrees)
      omega = {2.912427943500334E+01}    // Argument of perihelion (degrees)
      Omega = {4.833053877672862E+01}    // Longitude of ascending node (degrees)
      meanMotion={4.092345945966383E+00}
      j2000MeanAnomaly={1.727497133441682E+02}
      targetId="199"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
    />
    
  ) : null;
}

export default Mercury;
