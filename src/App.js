import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Noise, Vignette, SSAO } from '@react-three/postprocessing';
import { ToneMappingMode, Resizer, KernelSize } from 'postprocessing';

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
import UserControls from "./UserControls.js";

export var scalingFactor = 1.495239195637494e7;
export var planetScaling = 1000;
export var moonOrbitalPathScaling = 5;


function App() {
  const sunRef = useRef();

  const [planetScalingState, setPlanetScalingState] = useState(planetScaling);
  const [moonOrbitalPathScalingState, setMoonOrbitalPathScalingState] = useState(moonOrbitalPathScaling);

  const handlePlanetScalingChange = (e) => {
    setPlanetScalingState(e.target.value);
    planetScaling = e.target.value;  // Update global variable
  };

  const handleMoonOrbitalPathScalingChange = (e) => {
    setMoonOrbitalPathScalingState(e.target.value);
    moonOrbitalPathScaling = e.target.value;  // Update global variable
  };

  return (

  

    <div style={{ width: "100vw", height: "100vh" }}>


      <Canvas camera={{ position: [0, 50, 100], fov: 90, near: 0.001, far: 100000 }}>
        

        {/* Post-Processing Effects */}
        <EffectComposer multisampling={0} enableNormalPass>
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
          <Noise opacity={0.01} />
          <SSAO />
        </EffectComposer>

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        

        {/* Star Field */}
        <Stars radius={300} />

        
        <Sun ref={sunRef} emissive={true} emissiveColor={0xFFD700} emissiveIntensity={540} name="Sun" />

        {/* Planets */}
        <Mercury delay={50} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Venus delay={55} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Earth delay={60} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Mars delay={70} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Jupiter delay={80} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Saturn delay={90} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Uranus delay={100} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Neptune delay={110} position={[0, 0, 0]} scalingFactor={scalingFactor} />
        <Pluto delay={120} position={[0, 0, 0]} scalingFactor={scalingFactor} />

        {/* Camera Controls */}
        <UserControls />
      </Canvas>
      <div>
        <label>Planet Scaling: {planetScalingState}</label>
        <br></br>
        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={planetScalingState}
          onChange={handlePlanetScalingChange}
        />
        <br></br>
        <label>Moon Semi-Major Axis Scaling: {moonOrbitalPathScaling}</label>
        <br></br>
        <input
          type="range"
          min="0"
          max="40"
          step="0.1"
          value={moonOrbitalPathScaling}
          onChange={handleMoonOrbitalPathScalingChange}
        />
      </div>
    </div>
  );
}

export default App;
