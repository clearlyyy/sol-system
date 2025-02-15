import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Ganymede({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      distanceThreshold={20}
      name="Ganymede"
      textureUrl="/ganymede_texture.jpg"
      size={2631}
      color={"#D9A066"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.070820128269964E+06 }
      EC={ 1.747368801996100E-03 }
      i={ 2.333442858120520E+00 }
      omega={ 5.361905985804176E+00 }
      Omega={ 3.394538398427119E+02 }
      meanMotion={ 5.820094209150526E-04 * 86400 }
      j2000MeanAnomaly={ 2.534635305418828E+02 }
      targetId="503"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Ganymede is the largest moon in the solar system and the only moon known to have its own magnetic field. It has a subsurface ocean and a surface composed of both icy and rocky regions."}
			mass={1.4819e23}
			gravity={1.428}
			density={1.94}
			escapeVelocity={2.741}
      siderealPeriod={171.60}
      meanTempDay={-145}
			meanTempNight={-185}

    />
  ) : null; // Don't render anything before the delay
}

export default Ganymede;
