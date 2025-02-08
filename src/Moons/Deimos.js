import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Luna({daysSinceJ2000, ...props}) {
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
      name="Deimos"
      textureUrl="/deimos_texture.jpg"
      size={6.2}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={23460}
      EC={2.326887806077698E-02}
      i={2.139216434505546E+00}
      omega={1.857454990105412E+02}
      Omega={4.083435101456297E+01}
      meanMotion={4.538}
      j2000MeanAnomaly={1.305487789185887E+02}
      targetId="402"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
