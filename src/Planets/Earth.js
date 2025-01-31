import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Earth(props) {
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
      textureUrl="/earth_texture.jpg"
      size={1}
      color={"cyan"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={10}
      atmosphereColor={"blue"}
      A={149.598 * 1e6}
      EC={0.0167}
      i={0}
      omega={102.937}
      Omega={0}
      targetId="399"
    />
  ) : null; // Don't render anything before the delay
}

export default Earth;
