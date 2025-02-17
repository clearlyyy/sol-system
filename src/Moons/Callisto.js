import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Callisto({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Callisto"
      distanceThreshold={20}
      textureUrl="/callisto_texture.jpg"
      size={2410.3}
      color={"#D9A066"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.883801220323989E+06 }
      EC={ 7.184196428316506E-03 }
      i={ 1.949923844891594E+00 }
      omega={ 2.856253032554822E+01 }
      Omega={ 3.367433492632588E+02 }
      meanMotion={ 2.494293474500411E-04 * 86400 }
      j2000MeanAnomaly={ 2.945072298709688E+02 }
      type={"Icy Moon"}
      description={"Callisto is the second-largest moon of Jupiter and one of the most heavily cratered objects in the solar system. Its ancient surface suggests it has been geologically inactive for billions of years."}
      mass={1.0759e23}
      gravity={1.24}
      density={1.83}
      escapeVelocity={2.44}
      targetId="504"
      daysSinceJ2000={daysSinceJ2000}
      siderealPeriod={400.56}
      meanTempDay={-137}
			meanTempNight={-191}
    />
  ) : null; // Don't render anything before the delay
}

export default Callisto;
