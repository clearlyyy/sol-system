import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Tethys({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Tethys"
      textureUrl="/tethys_texture.jpg"
      size={531}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={20}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 2.949751791051294E+05 }
      EC={ 8.911411663124575E-04 }
      i={ 2.706616502216702E+01 }
      omega={ 9.014278330273885E+01 }
      Omega={ 1.685046602663736E+02 }
      meanMotion={ 2.202637277520926E-03 * 86400 }
      j2000MeanAnomaly={ 3.578429760487609E+02 }
      targetId="603"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Tethys is a mid-sized moon of Saturn, known for its heavily cratered surface and a large canyon called Ithaca Chasma. It is composed almost entirely of water ice."}
			mass={6.1745e20}
			gravity={0.145}
			density={0.98}
			escapeVelocity={0.39}
    />
  ) : null; // Don't render anything before the delay
}

export default Tethys;
