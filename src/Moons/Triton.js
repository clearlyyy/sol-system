import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Triton({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Triton"
      textureUrl="/oberon_texture.jpg"
      size={761.4}
      color={"#2D5B9A"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      initA={ 3.547672450525611E+05 }
      initEC={ 2.677633504954958E-05 }
      initi={ 1.291669481817508E+02 }
      initomega={ 3.322667835507913E+02 }
      initOmega={ 2.224225038620646E+02 }
      initmeanMotion={ 7.089657798202918E-04 * 86400 }
      j2000MeanAnomaly={ 2.986510325375847E+01 }
      targetId="704"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Triton is the largest moon of Neptune and one of the coldest objects in the solar system. It has a retrograde orbit, suggesting it was captured by Neptune, and features geysers of nitrogen gas."}
			mass={2.14e22}
			gravity={0.779}
			density={2.06}
			escapeVelocity={1.45}
      siderealPeriod={141.12}
      meanTempDay={-230}
			meanTempNight={-240}
    />
  ) : null; // Don't render anything before the delay
}

export default Triton;
