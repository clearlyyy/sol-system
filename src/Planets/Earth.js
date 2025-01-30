import React from "react";
import Planet from "../Planet";

function Earth(props) {
  return (
    <Planet
      {...props}
      textureUrl="/earth_texture.jpg"
      size={1}
      color={"cyan"}
      rotationSpeed={0.01}
      orbitSpeed={0.001}
      tilt={23.5}
      orbitRadius={10}
      atmosphereColor={"blue"}
    />
    
  );
}

export default Earth;
