import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Rhea({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      userControlsRef={userControlsRef}
      hostPosition={hostPosition}
      distanceThreshold={10}
      name="Rhea"
      textureUrl="/rhea_texture.jpg"
      size={763.8}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0.35}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 5.272251652187748E+05 }
      EC={ 1.292225898395054E-03 }
      i={ 2.820102457110636E+01 }
      omega={ 1.724418975263663E+02 }
      Omega={ 1.700984509324557E+02 }
      meanMotion={ 9.217807688546193E-04 * 86400 }
      j2000MeanAnomaly={ 3.562157923600643E+02 }
      targetId="604"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Rhea is the second-largest moon of Saturn, with a heavily cratered surface and a mix of ice and rock. It has a faint ring system, making it one of the few moons known to have rings."}
			mass={2.3065e21}
			gravity={0.264}
			density={1.23}
			escapeVelocity={0.58}
    />
  ) : null; // Don't render anything before the delay
}

export default Rhea;
