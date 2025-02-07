import React, { useState, useEffect } from "react";
import Planet from "../CelestialBodys/Planet";
import Io from "../Moons/Io"
import Europa from "../Moons/Europa"
import Ganymede from "../Moons/Ganymede"
import Callisto from "../Moons/Callisto"

function Jupiter({daysSinceJ2000, ...props}) {
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
      size={69911}
      color={"brown"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3.1}
      orbitRadius={30}
      atmosphereColor={"#B88A5D"}
      A={778.479*1e6}
      EC={4.892305962953223E-02}
      i={1.304655711046047E+00} // tilt
      omega={2.751197059498091E+02}
      Omega={1.004888615724618E+02}
      meanMotion={.08309}
      j2000MeanAnomaly={1.872492361720237E+01}
      targetId="599"
      hasClouds={false}
      daysSinceJ2000={daysSinceJ2000}
      type={"Gas Giant"}
      description={"Jupiter is the fifth planet from the Sun and the largest in our solar system. Known for its massive size, powerful storms, and striking Great Red Spot, Jupiter is a gas giant with a predominantly hydrogen and helium composition. It has a strong magnetic field, numerous moons, and a ring system, making it a fascinating and dynamic planet in the outer solar system."}
    >
      <Io position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Europa position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Ganymede position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      <Callisto position={[0, 0, 0]} daysSinceJ2000={daysSinceJ2000}/>
      </Planet>
    
  ) : null;
}

export default Jupiter;
