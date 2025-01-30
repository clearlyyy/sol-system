import React from "react";
import Planet from "../Planet";

function Jupiter(props) {
  return (
    <Planet
      {...props}
      textureUrl="/jupiter_texture.jpg"
      size={1}
      color={"brown"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3}
      orbitRadius={30}
      atmosphereColor={"red"}
    />
    
  );
}

export default Jupiter;
