import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";

function Uranus({daysSinceJ2000, userControlsRef, ...props}) {
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
      name="Uranus"
      textureUrl="/uranus_texture.jpg"
      size={25362}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={97.8}
      orbitRadius={5}
      atmosphereColor={"#00B5E2"}
      A = {	2867.043 * 1e6}
      EC = {4.439367187710320E-02}
      i = {7.723813829207361E-01}
      omega = {9.660797275005378E+01}
      Omega = {7.396291773291530E+01}
      meanMotion={.01190}
      j2000MeanAnomaly={1.429079296754021E+02}
      targetId="799"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Ice Giant"}
      description={"Uranus is the seventh planet from the Sun, known for its blue-green color due to methane in its atmosphere. It has a unique tilt, rotating on its side compared to other planets. Uranus is an ice giant with a cold, distant atmosphere of hydrogen, helium, and icy compounds."}
    />
    
  ) : null;
}

export default Uranus;
