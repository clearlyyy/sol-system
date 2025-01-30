import React from "react";
import Planet from "../Planet";

function Jupiter(props) {
  return (
    <Planet
      {...props}
      textureUrl="/jupiter_texture.jpg"
      size={11.209}
      color={"brown"}
      rotationSpeed={0.001}
      orbitSpeed={0.0001}
      tilt={3}
      orbitRadius={30}
      atmosphereColor={"red"}
      A={778.479*1e6}
      EC={.0489}
      i={0} // tilt
      omega={14.713}
      Omega={100.464}
    />
    
  );
}

export default Jupiter;
