import React from "react";
import Planet from "../Planet";

function Pluto(props) {
  return (
    <Planet
      {...props}
      textureUrl="/pluto_texture.jpg"
      size={3}
      rotationSpeed={0.0005}
      color={"brown"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"brown"}
      A = {	5869.656 * 1e6}
      EC = {.2488}
      i = {17.141}
      omega = {224.066}
      Omega = {110.303}
    />
    
  );
}

export default Pluto;
