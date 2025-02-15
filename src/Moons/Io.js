import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Io({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      distanceThreshold={20}
      name="Io"
      textureUrl="/io_texture.jpg"
      size={1821.6}
      color={"#D9A066"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 4.220205293150642E+05 }
      EC={ 3.503596852916024E-03 }
      i={ 2.186097436945496E+00 }
      omega={ 1.256224702817128E+02 }
      Omega={ 3.381293433474519E+02 }
      meanMotion={ 2.352327060649512E-03 * 86400 }
      j2000MeanAnomaly={ 1.768971971361218E+02 }
      targetId="501"
      daysSinceJ2000={daysSinceJ2000}
      type={"Rocky Moon"}
			description={"Io is the most volcanically active body in the solar system, with hundreds of volcanoes and a surface covered in sulfur and silicate rock. Its intense geological activity is driven by tidal heating from Jupiter."}
			mass={8.9319e22}
			gravity={1.796}
			density={3.53}
			escapeVelocity={2.56}
      siderealPeriod={42.46}
      meanTempDay={-130}
			meanTempNight={-140}
    />
  ) : null; // Don't render anything before the delay
}

export default Io;
