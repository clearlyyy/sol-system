import React from "react";
import Planet from "../Planet";

function Venus(props) {
  return (
    <Planet
      {...props}
      textureUrl="/venus_texture.jpg"
      size={.949}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"orange"}
      A = {108.21 * 1e6}
      EC = {.0068}
      i = {3.395}
      omega = {54.884}
      Omega = {76.680}
    />
    
  );
}

export default Venus;
