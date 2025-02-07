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
      name="Luna (The Moon)"
      textureUrl="/luna_texture.jpg"
      size={1737.4}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={384400}
      EC={6.476694128611285E-02}
      i={5.240010829674768E+00}
      omega={3.081359034620368E+02}
      Omega={1.239837028145578E+02}
      meanMotion={1.335975862137564E+01}
      j2000MeanAnomaly={1.407402571142365E+02}
      targetId="301"
      daysSinceJ2000={daysSinceJ2000}
      type={"Rocky Moon"}
      description={"The Moon is Earth's only natural satellite, with a surface covered in craters. It is tidally locked to Earth, always showing the same face, and affects Earth's tides and climate stability."}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
