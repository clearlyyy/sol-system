import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Dione({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Dione"
      textureUrl="/dione_texture.jpg"
      size={561}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0.06}
      orbitRadius={44}
      atmosphereColor={"black"}
      initA={ 3.776475352322902E+05 }
      initEC={ 2.717248041968071E-03 }
      initi={ 2.802571532089399E+01 }
      initomega={ 2.379180822516950E+02 }
      initOmega={ 1.695097674896243E+02 }
      initmeanMotion={ 1.520517405824279E-03 * 86400 }
      j2000MeanAnomaly={ 4.318386534866182E+01 }
      targetId="604"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Dione is a mid-sized moon of Saturn, known for its bright, icy surface and prominent wispy terrain. It is thought to have a subsurface ocean, making it a potential target for astrobiological studies."}
			mass={1.0955e21}
			gravity={0.232}
			density={1.48}
			escapeVelocity={0.51}
      siderealPeriod={65.52}
      meanTempDay={-200}
			meanTempNight={-208}
    />
  ) : null; // Don't render anything before the delay
}

export default Dione;
