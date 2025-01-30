import React from "react";
import Planet from "../Planet";

function Neptune(props) {
  return (
    <Planet
      {...props}
      textureUrl="/neptune_texture.jpg"
      size={3.883}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	4514.953 * 1e6}
      EC = {.0097}
      i = {1.769}
      omega = {44.971}
      Omega = {131.784}
    />
    
  );
}

export default Neptune;
