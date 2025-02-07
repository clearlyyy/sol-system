import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Noise, Vignette, SSAO, FXAA } from '@react-three/postprocessing';
import { ToneMappingMode, Resizer, KernelSize } from 'postprocessing';
import { Perf } from 'r3f-perf'

import Navbar from "./UI/Navbar.js"
import Controls from "./UI/Controls.js"
import PlanetaryInfo from './UI/PlanetaryInfo.js';

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
export var planetScaling = 5;
export var moonOrbitalPathScaling = 1;


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
  const daysSinceJ2000 = useRef(getDaysSinceJ2000(currentDate));
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  //Table Data for PlanetaryInfo 
  const [tableData, setTableData] = useState([]);

  

  //Update the date every second based on timeMultiplier.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate.getTime() + 10 * timeMultiplier);
        daysSinceJ2000.current = getDaysSinceJ2000(newDate);
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
      <PlanetaryInfo tableData={tableData}/>
      
      

      <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 50, 100], fov: 90, near: 0.0001, far: 100000 }}
        onCreated={state => state.gl.setClearColor("#2e3440")} 
        gl={{logarithmicDepthBuffer: true, powerPreference: "high-performance"}}
      >
        

        {/* Post-Processing Effects */}
        

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        
        <Perf position='bottom-right' logsPerSecond={1}/>

        {/* Star Field */}
        <Stars radius={300} />

        
        <Sun emissive={true} emissiveColor={0xFFD700} emissiveIntensity={540} name="Sun" size={696340} />

        {/* Planets */}
        <Mercury delay={50} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Venus delay={55} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Earth delay={60} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Mars delay={70} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Jupiter delay={80} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Saturn delay={90} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Uranus delay={100} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Neptune delay={110} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>
        <Pluto delay={120} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current}/>

        {/* Camera Controls */}
        <UserControls setTableData={setTableData}/>
        
      </Canvas>
      </div>
    
        <Controls
         currentDate={currentDate} 
         timeMultiplier={timeMultiplier}
         onChangeTimeMultiplier={handleTimeMultiplier}
         />

    </div>
  );
}

export default App;
