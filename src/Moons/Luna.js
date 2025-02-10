import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Luna({daysSinceJ2000, hostPosition, ...props}) {
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
      name="Luna (The Moon)"
      textureUrl="/luna_texture.jpg"
      size={1737.4}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={3.851657706075175E+05}
      EC={3.606565421276240E-02}
      i={5.172024573626966E+00}
      omega={2.546820332712215E+01}
      Omega={3.575618180910739E+02}
      meanMotion={1.522560701434421E-04}
      j2000MeanAnomaly={8.305719762886987E+01}
      targetId="301"
      daysSinceJ2000={daysSinceJ2000}
      type={"Rocky Moon"}
      description={"The Moon is Earth's only natural satellite, with a surface covered in craters. It is tidally locked to Earth, always showing the same face, and affects Earth's tides and climate stability."}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
