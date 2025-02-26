import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Mimas({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Mimas"
      textureUrl="/mimas_texture.jpg"
      size={198.2}
      color={"#e2bf7d"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0.06}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 1.860122166254450E+05 }
      EC={ 1.837040397107320E-02 }
      i={ 2.935875624238190E+01 }
      omega={ 2.948629186416495E+02 }
      Omega={ 1.677003121499674E+02 }
      meanMotion={ 4.398542286095829E-03 * 86400 }
      j2000MeanAnomaly={ 1.089647008780583E+02 }
      targetId="601"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Mimas is a small, icy moon of Saturn known for its massive Herschel Crater, which gives it a striking resemblance to the Death Star from Star Wars. Its surface is heavily cratered and icy."}
			mass={3.7493e19}
			gravity={0.064}
			density={1.15}
			escapeVelocity={0.16}
      siderealPeriod={22.56}
      meanTempDay={-200}
			meanTempNight={-210}
    />
  ) : null; // Don't render anything before the delay
}

export default Mimas;
