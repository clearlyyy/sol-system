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
      initA={ 5.272251652187748E+05 }
      initEC={ 1.292225898395054E-03 }
      initi={ 2.820102457110636E+01 }
      initomega={ 1.724418975263663E+02 }
      initOmega={ 1.700984509324557E+02 }
      initmeanMotion={ 9.217807688546193E-04 * 86400 }
      j2000MeanAnomaly={ 3.562157923600643E+02 }
      targetId="604"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Rhea is the second-largest moon of Saturn, with a heavily cratered surface and a mix of ice and rock. It has a faint ring system, making it one of the few moons known to have rings."}
			mass={2.3065e21}
			gravity={0.264}
			density={1.23}
			escapeVelocity={0.58}
      siderealPeriod={108.24}
      meanTempDay={-190}
			meanTempNight={-210}
    />
  ) : null; // Don't render anything before the delay
}

export default Rhea;
