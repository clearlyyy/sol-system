import React from "react";
import Planet from "../Planet";

function Uranus(props) {
  return (
    <Planet
      {...props}
      textureUrl="/uranus_texture.jpg"
      size={4.007}
      rotationSpeed={0.0005}
      color={"blue"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"blue"}
      A = {	2867.043 * 1e6}
      EC = {.0463}
      i = {0.773}
      omega = {170.954}
      Omega = {74.006}
    />
    
  );
}

export default Uranus;
