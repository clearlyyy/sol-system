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
      name="Jupiter"
      textureUrl="/jupiter_texture.jpg"
      size={11.209}
      color={"brown"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3}
      orbitRadius={30}
      atmosphereColor={"red"}
      A={778.479*1e6}
      EC={4.892305962953223E-02}
      i={1.304655711046047E+00} // tilt
      omega={2.751197059498091E+02}
      Omega={1.004888615724618E+02}
      meanMotion={.08309}
      j2000MeanAnomaly={1.872492361720237E+01}
      targetId="599"
    />
    
  ) : null;
}

export default Jupiter;
