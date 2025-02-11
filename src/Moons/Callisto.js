import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Callisto({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="callisto"
      distanceThreshold={10}
      textureUrl="/callisto_texture.jpg"
      size={2410.3}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={1.882779892377612E+06}
      EC={7.432941708860398E-03}
      i={2.016913882947653E+00}
      omega={1.632003665270385E+01}
      Omega={3.379432608177467E+02}
      meanMotion={0.3435}
      j2000MeanAnomaly={2.549532190835189E+02}
      targetId="504"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Callisto;
