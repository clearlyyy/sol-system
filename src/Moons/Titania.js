import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Titania({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Titania"
      textureUrl="/titania_texture.jpg"
      size={788}
      color={"#ACE5EE"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      initA={ 4.362485548477788E+05 }
      initEC={ 1.608099439302163E-03 }
      initi={ 9.776492036094507E+01 }
      initomega={ 2.845692494893340E+02 }
      initOmega={ 1.676405589946448E+02 }
      initmeanMotion={ 4.786492413461645E-04 * 86400 }
      j2000MeanAnomaly={ 2.077331310690947E+02 }
      targetId="703"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Titania is the largest moon of Uranus, with a surface marked by canyons, impact craters, and evidence of past geological activity. It is composed of a mix of ice and rock."}
			mass={3.4e21}
			gravity={0.367}
			density={1.71}
			escapeVelocity={0.77}
      siderealPeriod={209.04}
      meanTempDay={-205}
			meanTempNight={-215}
    />
  ) : null; // Don't render anything before the delay
}

export default Titania;
