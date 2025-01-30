import React from "react";
import Planet from "../Planet";

function Saturn(props) {
  return (
    <Planet
      {...props}
      textureUrl="/saturn_texture.jpg"
      size={9.449}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"orange"}
      A = {1432.041 * 1e6}
      EC = {.0565}
      i = {2.485}
      omega = {92.431}
      Omega = {113.665}
    />
    
  );
}

export default Saturn;
