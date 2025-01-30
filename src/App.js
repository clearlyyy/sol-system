import React from "react";
import './App.css';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Planets/Earth";
import Mars from "./Planets/Mars";
import Venus from "./Planets/Venus";
import Jupiter from "./Planets/Jupiter.js";
import Sun from "./Sun";

function App() {

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 50, 100], fov: 80 }}>
        
        <Stars />
        <Sun />

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={1} distance={100} color={0xFFD700} />
        

        {/* Planets */}
        <Venus position={[0, 0, 0]}/>
        <Earth position={[0, 0, 0]}/>
        <Mars position={[0, 0, 0]}/>
        <Jupiter position={[0, 0, 0]}/>
        


        {/* Camera Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
