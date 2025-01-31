import React, { useState, useEffect } from "react";
import Planet from "../Planet";

function Jupiter(props) {
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
      textureUrl="/jupiter_texture.jpg"
      size={11.209}
      color={"brown"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3}
      orbitRadius={30}
      atmosphereColor={"red"}
      A={778.479*1e6}
      EC={.0489}
      i={0} // tilt
      omega={14.713}
      Omega={100.464}
      targetId="599"
    />
    
  ) : null;
}

export default Jupiter;
