import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Umbriel({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Umbriel"
      textureUrl="/umbriel_texture.jpg"
      size={584.7}
      color={"#ACE5EE"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 2.660094395745178E+05 }
      EC={ 3.404851254760458E-03 }
      i={ 9.770816900030003E+01 }
      omega={ 5.298895335387520E+01 }
      Omega={ 1.677226472826264E+02 }
      meanMotion={ 1.005235124724960E-03 * 86400 }
      j2000MeanAnomaly={ 3.179192269593954E+02 }
      targetId="702"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Umbriel is one of Uranus's largest moons, with a dark, heavily cratered surface and a mysterious bright ring called Wunda. It is composed primarily of water ice and rock."}
			mass={1.2e21}
			gravity={0.23}
			density={1.39}
			escapeVelocity={0.52}
      siderealPeriod={99.36}
      meanTempDay={-205}
			meanTempNight={-215}
    />
  ) : null; // Don't render anything before the delay
}

export default Umbriel;
