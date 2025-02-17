import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Luna({daysSinceJ2000,  hostPosition, userControlsRef, ...props}) {
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
      name="Deimos"
      distanceThreshold={10}
      textureUrl="/deimos_texture.jpg"
      size={6.2}
      color={"#B84E36"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 2.345970623300157E+04 }
      EC={ 2.909257113435189E-04 }
      i={ 2.423956367943092E+01 }
      omega={ 3.497573115350104E+01 }
      Omega={ 8.081223220483606E+01 }
      meanMotion={ 3.299928803366823E-03 * 86400 }
      j2000MeanAnomaly={ 7.214050074527356E+01 }
      targetId="402"
      daysSinceJ2000={daysSinceJ2000}
      type={"Small Irregular Moon"}
			description={"Deimos is the smaller and outermost of Mars's two moons, with a heavily cratered and smooth surface. Its irregular shape and low gravity make it resemble a captured asteroid."}
			mass={1.4762e15}
			gravity={0.003}
			density={1.47}
			escapeVelocity={0.0057}
      siderealPeriod={30.24}
      meanTempDay={-15}
			meanTempNight={-95}
    />
  ) : null; // Don't render anything before the delay
}

export default Luna;
