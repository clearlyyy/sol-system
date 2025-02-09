import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";

function Saturn({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Saturn"
      textureUrl="/saturn_texture.jpg"
      size={58230}
      rotationSpeed={0.0005}
      color={"#e2bf7d"}
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
      daysSinceJ2000={daysSinceJ2000}
      type={"Gas Giant"}
      description={"Saturn is the sixth planet from the Sun, famous for its stunning rings made of ice and rock. It is a gas giant with a thick atmosphere of hydrogen and helium, and it has over 80 moons, including Titan, the second-largest moon in the solar system."}
      mass={5.68e26}
      gravity={10.44}
      density={0.687}
      escapeVelocity={35.5}
    
    />
    
  ) : null;
}

export default Saturn;
