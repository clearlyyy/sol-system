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
      name="Phobos"
      textureUrl="/phobos_texture.jpg"
      size={11}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={9377}
      EC={1.541577819823969E-02}
      i={2.605134469886070E+01}
      omega={3.423765737283923E+02}
      Omega={8.481060425430211E+01}
      meanMotion={17.9548}
      j2000MeanAnomaly={3.458103512387291E+02}
      targetId="401"
      daysSinceJ2000={daysSinceJ2000}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
