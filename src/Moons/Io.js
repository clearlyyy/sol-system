import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Io({daysSinceJ2000, ...props}) {
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
      name="Io"
      textureUrl="/io_texture.jpg"
      size={1821.6}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={4.220209233666365E+05}
      EC={3.763526322651238E-03}
      i={2.212685881373811E+00}
      omega={6.295651616614995E+01}
      Omega={3.368522291524058E+02}
      meanMotion={3.2337}
      j2000MeanAnomaly={2.373915791498890E+02}
      targetId="501"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Io;
