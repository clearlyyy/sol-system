import React from "react";
import Planet from "../Planet";

function Mars(props) {
  return (
    <Planet
      {...props}
      textureUrl="/mars_texture.jpg"
      size={.532}
      rotationSpeed={0.012}
      color={"orange"}
      orbitSpeed={0.0007}
      tilt={25.2}
      orbitRadius={15}
      atmosphereColor={"red"}
      A={227.956*1e6}
      EC={.0934}
      i={1.850} // tilt
      omega={336.040}
      Omega={49.557}
    />
    
  );
}

export default Mars;
