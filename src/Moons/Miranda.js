import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Miranda({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Miranda"
      textureUrl="/miranda_texture.png"
      size={235.8}
      color={"#ACE5EE"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.298713997716866E+05 }
      EC={ 1.637504599856847E-03 }
      i={ 1.004046294675958E+02 }
      omega={ 3.727497436381719E+01 }
      Omega={ 1.640791928071461E+02 }
      meanMotion={ 2.946726973429790E-03 * 86400 }
      j2000MeanAnomaly={ 3.476951927585834E+01 }
      targetId="705"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Miranda is the smallest and innermost of Uranus's five major moons, known for its chaotic terrain and dramatic cliffs. Its varied surface suggests a history of intense geological activity."}
			mass={6.59e19}
			gravity={0.079}
			density={1.20}
			escapeVelocity={0.19}
      siderealPeriod={33.84}
      meanTempDay={-190}
			meanTempNight={-210}
    />
  ) : null; // Don't render anything before the delay
}

export default Miranda;
