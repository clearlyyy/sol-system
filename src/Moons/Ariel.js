import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Ariel({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Ariel"
      textureUrl="/ariel_texture.png"
      size={578.9}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.909426038773397E+05 }
      EC={ 5.647760461768456E-04 }
      i={ 9.771247059856736E+01 }
      omega={ 2.305690486702431E+02 }
      Omega={ 1.676620183361535E+02 }
      meanMotion={ 1.652946862745236E-03 * 86400 }
      j2000MeanAnomaly={ 8.757764951771551E+01 }
      targetId="701"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
      description={"Ariel is the brightest and fourth-largest moon of Uranus, with a surface marked by extensive valleys and impact craters. It is believed to have a young, geologically active surface."}
      mass={1.35e21}
      gravity={0.27}
      density={1.59}
      escapeVelocity={0.56}
    />
  ) : null; // Don't render anything before the delay
}

export default Ariel;
