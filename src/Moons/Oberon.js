import React, { useState, useEffect } from "react";
import Moon from "../CelestialBodys/Moon";

function Oberon({daysSinceJ2000, hostPosition, userControlsRef, ...props}) {
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
      name="Oberon"
      textureUrl="/oberon_texture.jpg"
      size={761.4}
      color={"grey"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={0}
      orbitRadius={44}
      atmosphereColor={"black"}
      A={ 5.835823454259721E+05 }
      EC={ 2.507511584051833E-03 }
      i={ 9.790539034721706E+01 }
      omega={ 1.835886165160946E+02 }
      Omega={ 1.677115135464178E+02 }
      meanMotion={ 3.093604830605053E-04 * 86400 }
      j2000MeanAnomaly={ 2.718468404221883E+02 }
      targetId="704"
      daysSinceJ2000={daysSinceJ2000}
      type={"Icy Moon"}
			description={"Oberon is the second-largest and outermost of Uranus's major moons, with a heavily cratered surface and evidence of past geological activity. It is composed of a mix of ice and rock."}
			mass={3.014e21}
			gravity={0.346}
			density={1.63}
			escapeVelocity={0.73}
    />
  ) : null; // Don't render anything before the delay
}

export default Oberon;
