import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Luna({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Luna (The Moon)"
      textureUrl="/luna_texture.jpg"
      size={1737.4}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      initA={ 3.863941711873159E+05 }
      initEC={ 3.800991571525237E-02 }
      initi={ 5.177402323054894E+00 }
      initomega={ 3.035654526445038E+01 }
      initOmega={ 3.574558934810182E+02 }
      initmeanMotion={ 1.515305828164929E-04 * 86400 }
      j2000MeanAnomaly={ 9.117669164122039E+01 }
      targetId="301"
      daysSinceJ2000={daysSinceJ2000}
      type={"Rocky Moon"}
      description={"Luna, commonly known as the Moon, is Earth's only natural satellite and the fifth-largest moon in the solar system. It has a heavily cratered surface and influences Earth's tides."}
      mass={7.342e22}
      gravity={1.62}
      density={3.34}
      escapeVelocity={2.38}
      siderealPeriod={655.68}
      meanTempDay={107}
			meanTempNight={-153}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
