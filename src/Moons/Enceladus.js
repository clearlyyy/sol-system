import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Enceladus({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Enceladus"
      textureUrl="/enceladus_texture.jpg"
      size={561.4}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 2.384086627716939E+05 }
      EC={ 3.546069702422481E-03 }
      i={ 2.804916130110298E+01 }
      omega={ 3.357755833570890E+02 }
      Omega={ 1.695372173787967E+02 }
      meanMotion={ 3.031363051897524E-03 * 86400 }
      j2000MeanAnomaly={ 2.350338803912511E+02 }
      targetId="602"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Enceladus is a small, icy moon of Saturn known for its geysers of water vapor and ice erupting from its south pole. It has a subsurface ocean, making it a prime candidate for potential extraterrestrial life."}
			mass={1.0802e20}
			gravity={0.113}
			density={1.61}
			escapeVelocity={0.24}
      siderealPeriod={32.88}
      meanTempDay={-195}
			meanTempNight={-205}
    />
  ) : null; // Don't render anything before the delay
}

export default Enceladus;
