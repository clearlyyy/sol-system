import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

import { getFresnelMat } from "../Shaders/getFresnelMat";
import { planetScaling } from "../App";

function Titan({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Titan"
      textureUrl="/titan_texture.jpg"
      size={2575}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={27}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.221933311251816E+06 }
      EC={ 2.872544937441408E-02 }
      i={ 2.771105839686493E+01 }
      omega={ 1.773673254538171E+02 }
      Omega={ 1.690722505978772E+02 }
      meanMotion={ 2.612769480370023E-04 * 86400 }
      j2000MeanAnomaly={ 2.379563904900789E+02 }
      targetId="606"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Titan is the largest moon of Saturn and the second-largest moon in the solar system. It has a thick nitrogen-rich atmosphere and liquid hydrocarbon lakes, making it a unique and Earth-like world."}
			mass={1.3452e23}
			gravity={1.352}
			density={1.88}
			escapeVelocity={2.64}
      atmosphere={getFresnelMat("#E2903D", 0x000000, 0.01, 0.5, planetScaling)}
      siderealPeriod={382.80}
      meanTempDay={-180}
			meanTempNight={-180}
    />
  ) : null; // Don't render anything before the delay
}

export default Titan;
