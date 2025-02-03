import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Noise, Vignette, SSAO, FXAA } from '@react-three/postprocessing';
import { ToneMappingMode, Resizer, KernelSize } from 'postprocessing';

import Navbar from "./UI/Navbar.js"
import Controls from "./UI/Controls.js"

import Earth from "./Planets/Earth";
import Mercury from "./Planets/Mercury";
import Mars from "./Planets/Mars";
import Venus from "./Planets/Venus";
import Jupiter from "./Planets/Jupiter.js";
import Saturn from "./Planets/Saturn.js";
import Uranus from "./Planets/Uranus.js";
import Neptune from "./Planets/Neptune.js";
import Pluto from "./Planets/Pluto.js";
import Sun from "./CelestialBodys/Sun.js";
import UserControls from "./UserControls/UserControls.js";

export var scalingFactor = 1.495239195637494e7;
export var planetScaling = 1000;
export var moonOrbitalPathScaling = 5;


function getDaysSinceJ2000(date) {
  const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const diffInMs = date - j2000;
  return diffInMs / (1000 * 60 * 60 * 24);
}

function CameraControls() {
  const { camera } = useThree();
  const sunRef = React.useRef();

  // Update the camera's near and far planes dynamically based on camera position
  useEffect(() => {
    const adjustCameraPlanes = () => {
      if (sunRef.current) {
        const distanceToSun = camera.position.length(); // Distance from camera to Sun
        const minDistance = Math.max(10, distanceToSun - 500); // Avoid too small near values
        const maxDistance = distanceToSun + 5000; // Distance to most distant objects
        
        // Smoothly adjust the near and far planes to avoid depth issues
        camera.near = minDistance;
        camera.far = maxDistance;
        
        camera.updateProjectionMatrix(); // Update projection matrix with new near/far values
      }
    };

    adjustCameraPlanes();
    // Run adjustCameraPlanes whenever the camera position changes
    return () => adjustCameraPlanes();
  }, [camera.position]);

  return <Sun ref={sunRef} emissive={true} emissiveColor={0xFFD700} emissiveIntensity={540} name="Sun" />;
}



function App() {
  
  const sunRef = useRef();

  const [planetScalingState, setPlanetScalingState] = useState(planetScaling);
  const [moonOrbitalPathScalingState, setMoonOrbitalPathScalingState] = useState(moonOrbitalPathScaling);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysSinceJ2000, setDaysSinceJ2000] = useState(getDaysSinceJ2000(currentDate));
  const [timeMultiplier, setTimeMultiplier] = useState(1);

  

  //Update the date every second based on timeMultiplier.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate.getTime() + 10 * timeMultiplier);
        setDaysSinceJ2000(getDaysSinceJ2000(newDate));
        return newDate;
      })
    }, 10);
    return () => clearInterval(interval);
  }, [timeMultiplier])

  const handleTimeMultiplier = (e) => {
    setTimeMultiplier(e);
  }


  const handlePlanetScalingChange = (e) => {
    setPlanetScalingState(e.target.value);
    planetScaling = e.target.value;  // Update global variable
  };

  const handleMoonOrbitalPathScalingChange = (e) => {
    setMoonOrbitalPathScalingState(e.target.value);
    moonOrbitalPathScaling = e.target.value;  // Update global variable
  };

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh" }}>

      {/* Navbar */}
      <Navbar/>
      

      <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 50, 100], fov: 90, near: 0.0001, far: 100000 }}
        onCreated={state => state.gl.setClearColor("#2e3440")} // This will set the background to black
        gl={{logarithmicDepthBuffer: true}}
      >
        {/* Post-Processing Effects */}
        <EffectComposer multisampling={0}>
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          
          <Vignette eskil={false} offset={0.1} darkness={0.1} />
          
          
        </EffectComposer>

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        

        {/* Star Field */}
        <Stars radius={300} />

        
        <Sun emissive={true} emissiveColor={0xFFD700} emissiveIntensity={540} name="Sun" />

        {/* Planets */}
        <Mercury delay={50} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Venus delay={55} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Earth delay={60} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Mars delay={70} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Jupiter delay={80} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Saturn delay={90} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Uranus delay={100} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Neptune delay={110} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>
        <Pluto delay={120} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000}/>

        {/* Camera Controls */}
        <UserControls />
      </Canvas>
      </div>
      <div>
        <label>Planet Scaling: {planetScalingState}</label>
        <br></br>
        <input
          type="range"
          min="1"
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
          step="1"
          value={moonOrbitalPathScaling}
          onChange={handleMoonOrbitalPathScalingChange}
        />
      </div>
      <label>Time Speed: {timeMultiplier}x</label> <br/>
        <input
          type="range"
          min="1"
          max="500000"
          step="0.1"
          value={timeMultiplier}
          onChange={(e) => setTimeMultiplier(parseFloat(e.target.value))}
        /> <br/>
        <label>Current Date: {currentDate.toLocaleString()}</label>


        <Controls
         currentDate={currentDate} 
         timeMultiplier={timeMultiplier}
         onChangeTimeMultiplier={handleTimeMultiplier}
         />

    </div>
  );
}

export default App;
