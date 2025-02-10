import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Europa({daysSinceJ2000, hostPosition, ...props}) {
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
      hostPosition={hostPosition}
      name="Europa"
      textureUrl="/europa_texture.jpg"
      size={1560.8}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={6.709358927628163E+05}
      EC={9.470430684303763E-03}
      i={1.790939298819423E+00}
      omega={2.557894434175601E+02}
      Omega={3.326264490462856E+02}
      meanMotion={1.6131}
      j2000MeanAnomaly={2.935886924948249E+02}
      targetId="502"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Europa;
