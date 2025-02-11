import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Mimas({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Mimas"
      textureUrl="/mimas_texture.jpg"
      size={198.2}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0.06}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={1.860055707917493E+05}
      EC={1.760587913972963E-02}
      i={2.699265270244498E+01}
      omega={9.918321111653152E+01}
      Omega={1.720385191460957E+02}
      meanMotion={4.398778022919621E-03 * 86400}
      j2000MeanAnomaly={2.159494611442844E+02}
      targetId="601"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Mimas;
