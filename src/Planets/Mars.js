import React from "react";
import Planet from "../Planet";

function Mars(props) {
  return (
    <Planet
      {...props}
      textureUrl="/mars_texture.jpg"
      size={0.7}
      rotationSpeed={0.012}
      color={"orange"}
      orbitSpeed={0.0007}
      tilt={25.2}
      orbitRadius={15}
      atmosphereColor={"red"}
    />
    
  );
}

export default Mars;
