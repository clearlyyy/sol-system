import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Ganymede({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
    <Moon
      {...props}
      userControlsRef={userControlsRef}
      hostPosition={hostPosition}
      distanceThreshold={10}
      name="Ganymede"
      textureUrl="/ganymede_texture.jpg"
      size={2631}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.070573194235581E+06}
      EC={1.318102719568414E-03}
      i={2.214135411487959E+00}
      omega={3.167388234468396E+02}
      Omega={3.431731565490069E+02}
      meanMotion={0.7998}
      j2000MeanAnomaly={2.549532190835189E+02}
      targetId="503"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Ganymede;
