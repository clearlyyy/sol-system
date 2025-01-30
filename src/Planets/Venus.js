import React from "react";
import Planet from "../Planet";

function Venus(props) {
  return (
    <Planet
      {...props}
      textureUrl="/venus_texture.jpg"
      size={0.9}
      rotationSpeed={0.0005}
      color={"orange"}
      orbitSpeed={0.002}
      tilt={3}
      orbitRadius={5}
      atmosphereColor={"orange"}
    />
    
  );
}

export default Venus;
