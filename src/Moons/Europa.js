import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Europa({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Europa"
      distanceThreshold={20}
      textureUrl="/europa_texture.jpg"
      size={1560.8}
      color={"#D9A066"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0.1}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 6.712584086671803E+05 }
      EC={ 9.490553938596196E-03 }
      i={ 2.233867251662807E+00 }
      omega={ 3.174765257330752E+02 }
      Omega={ 3.260082520334616E+02 }
      meanMotion={ 1.172623887824027E-03 * 86400 }
      j2000MeanAnomaly={ 2.688444933781274E+02 }
      targetId="502"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Europa is one of Jupiter's largest moons, with a smooth, icy surface and a likely subsurface ocean. It is considered one of the most promising places in the solar system to search for extraterrestrial life."}
			mass={4.7998e22}
			gravity={1.315}
			density={3.01}
			escapeVelocity={2.025}
      siderealPeriod={85.20}
      meanTempDay={-160}
			meanTempNight={-180}

    />
  ) : null; // Don't render anything before the delay
}

export default Europa;
