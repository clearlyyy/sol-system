import React from "react";
import Planet from "../Planet";

function Mercury(props) {
  return (
    <Planet
      {...props}
      textureUrl="/mercury_texture.jpg"
      size={.383}
      rotationSpeed={0.012}
      color={"orange"}
      orbitSpeed={0.0007}
      tilt={25.2}
      orbitRadius={15}
      atmosphereColor={"red"}
      A = {57.909 * 1e6}  // Semi-major axis (AU)
      EC = {0.2056}       // Eccentricity
      i = {7.004}         // Inclination (degrees)
      omega = {29.124}    // Argument of perihelion (degrees)
      Omega = {48.331}    // Longitude of ascending node (degrees)
    />
    
  );
}

export default Mercury;
