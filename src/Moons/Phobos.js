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
      name="Phobos"
      textureUrl="/phobos_texture.jpg"
      size={11}
      color={"#B84E36"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 9.379270986268926E+03 }
      EC={ 1.474328572002532E-02 }
      i={ 2.670531680335356E+01 }
      omega={ 1.523533451538571E+01 }
      Omega={ 8.524082427595087E+01 }
      meanMotion={ 1.305373529536435E-02 * 86400 }
      j2000MeanAnomaly={ 1.663327823615191E+02 }
      targetId="401"
      daysSinceJ2000={daysSinceJ2000}
      type={"Small Irregular Moon"}
			description={"Phobos is the larger and innermost of Mars's two moons, with an irregular shape and a heavily cratered surface. It orbits so close to Mars that it is gradually spiraling inward and will eventually collide with the planet."}
			mass={1.0659e16}
			gravity={0.0057}
			density={1.88}
			escapeVelocity={0.011}
      siderealPeriod={7.68}
      meanTempDay={-20}
			meanTempNight={-100}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
