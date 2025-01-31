import React from "react";
import './App.css';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Planets/Earth";
import Mercury from "./Planets/Mercury";
import Mars from "./Planets/Mars";
import Venus from "./Planets/Venus";
import Jupiter from "./Planets/Jupiter.js";
import Saturn from "./Planets/Saturn.js";
import Uranus from "./Planets/Uranus.js";
import Neptune from "./Planets/Neptune.js";
import Pluto from "./Planets/Pluto.js";
import Sun from "./Sun";

function App() {

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 50, 100], fov: 90, near: 0.1, far: 100000}}>
        
        <Stars radius={400}/>
        <Sun />

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={1} distance={100} color={0xFFD700} />
        

        {/* Planets */}
        <Mercury delay={50} position={[0, 0, 0]}/>
        <Venus delay={100} position={[0, 0, 0]}/>
        <Earth delay={200} position={[0, 0, 0]}/>
        <Mars delay={300} position={[0, 0, 0]}/>
        <Jupiter delay={400} position={[0, 0, 0]}/>
        <Saturn delay={500} position={[0, 0, 0]}/>
        <Uranus delay={600} position={[0, 0, 0]}/>
        <Neptune delay={700} position={[0, 0, 0]}/>
        <Pluto delay={800} position={[0, 0, 0]}/>
        


        {/* Camera Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
