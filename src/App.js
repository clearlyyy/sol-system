import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Noise, Vignette, SSAO, FXAA, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from "postprocessing";
import { ToneMappingMode, Resizer, KernelSize, Effect, Resolution } from 'postprocessing';
import { Perf } from 'r3f-perf'

import Loading from './UI/Loading.js';

import Navbar from "./UI/Navbar.js"
import Controls from "./UI/Controls.js"
import PlanetaryInfo from './UI/PlanetaryInfo.js';
import Tools from './UI/Tools.js';

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

export var scalingFactor = 0.0495239195637494e7;
export var planetScaling = 1;
export var sunScaling = 1 // Sun gets a bit too big when planetScaling goes up, which engulfs close planets.
export var moonOrbitalPathScaling = 1;


function getDaysSinceJ2000(date) {
  const j2000 = new Date(Date.UTC(2025, 1, 11, 0, 0, 0, 0));
  const diffInMs = date - j2000;
  return diffInMs / (1000 * 60 * 60 * 24);
}

function App() {
  
  const sunRef = useRef();
  const starsRef = useRef();
  const canvasRef = useRef(null);
  const userControlsRef = useRef();
  const orbitControlsRef = useRef();

  const [planetScalingState, setPlanetScalingState] = useState(planetScaling);
  const [moonOrbitalPathScalingState, setMoonOrbitalPathScalingState] = useState(moonOrbitalPathScaling);
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysSinceJ2000 = useRef(getDaysSinceJ2000(currentDate));
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  const [followBody, setFollowBody] = useState(false);
  const [selectedBody, setSelectedBody] = useState(null);
  const [showPerf, setShowPerf] = useState(false);

  const [isPlanetaryInfoVisible, setIsPlanetaryInfoVisible] = useState(false);
  const [isToolsVisible, setIsToolsVisible] = useState(false);
  const [isToScale, setIsToScale] = useState(true);

  const [controlsLoaded, setControlsLoaded] = useState(false);

  //Table Data for PlanetaryInfo 
  const [tableData, setTableData] = useState([]);

  //Update the date every second based on timeMultiplier.
  useEffect(() => {
    let animationFrameId;
    let lastUpdateTime = performance.now();
  
    const updateDate = () => {
      const now = performance.now();
      const elapsedTime = now - lastUpdateTime; // Time since last update in milliseconds
  
      const timeToAdd = elapsedTime * timeMultiplier;
  
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate.getTime() + timeToAdd);
        daysSinceJ2000.current = getDaysSinceJ2000(newDate);
        return newDate;
      });
  
      lastUpdateTime = now; // Update the last update time
      animationFrameId = requestAnimationFrame(updateDate); // Schedule the next update
    };
  
    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateDate);
  
    // Cleanup on unmount or when timeMultiplier changes
    return () => cancelAnimationFrame(animationFrameId);
  }, [timeMultiplier]);

  //Delay User Controls from loading instantly.
  useEffect(() => {
    const timer = setTimeout(() => {
      setControlsLoaded(true);
    }, 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  //Check if scene is to proper scale;
  useEffect(() => {
    if (planetScaling == 1 && moonOrbitalPathScaling == 1 && sunScaling == 1 ) {
      setIsToScale(true);
    } else {
    setIsToScale(false);
    }
  }, [planetScaling, moonOrbitalPathScaling, sunScaling, scalingFactor])


  const handleTimeMultiplier = (e) => {
    setTimeMultiplier(e);
  }


  const handlePlanetScalingChange = (e) => {
    setPlanetScalingState(e);
    planetScaling = e; 
  };

  const handleMoonOrbitalPathScalingChange = (e) => {
    setMoonOrbitalPathScalingState(e);
    moonOrbitalPathScaling = e;  
  };

  const setToScale = () => {
    handlePlanetScalingChange(1);
    handleMoonOrbitalPathScalingChange(1);
  }

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh" }}>
      <Loading/>
      {/* Navbar */}
      <Navbar userControlsRef={userControlsRef} isToolsVisible={isToolsVisible} setisToolsVisible={setIsToolsVisible}/>
      <PlanetaryInfo tableData={tableData} isVisible={isPlanetaryInfoVisible} setIsVisible={setIsPlanetaryInfoVisible} selectedObject={selectedBody}/>
      <Tools isVisible={isToolsVisible} setIsVisible={setIsToolsVisible} setPlanetScalingState={setPlanetScalingState}
             handlePlanetScalingChange={handlePlanetScalingChange}
             handleMoonOrbitalPathScalingChange={handleMoonOrbitalPathScalingChange}
             showPerf={showPerf} setShowPerf={setShowPerf}/>
      

      <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          zIndex: -1 }}>
      <Canvas ref={canvasRef}
        camera={{ position: [0, 400, 700], fov: 70, near: 0.00001, far: 100000 }}
        onCreated={state => state.gl.setClearColor("#2e3440")} 
        gl={{logarithmicDepthBuffer: true, powerPreference: "high-performance"}}
      >
        

        {/* Post-Processing Effects */}
        <EffectComposer multisampling={0}>
          <ToneMapping mode={ToneMappingMode.CINEON}/>
        </EffectComposer>
        

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        
        {showPerf && <Perf position='bottom-right' logsPerSecond={1}/>}

        {/* Star Field */}
        <Stars ref={starsRef} layers={1} radius={10000} raycast={null} ignorePointer />

        
        <Sun emissive={true} emissiveColor={0xFFD700} emissiveIntensity={540} name="Sun" size={696340} type="Yellow Dwarf Star" mass={1.989e30} gravity={274} density={1.41} tilt={7.25} />

        {/* Planets */}
        <Mercury delay={50} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Venus delay={55} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Earth delay={60} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Mars delay={70} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Jupiter delay={80} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Saturn delay={90} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Uranus delay={100} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Neptune delay={110} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>
        <Pluto delay={120} position={[0, 0, 0]} scalingFactor={scalingFactor} daysSinceJ2000={daysSinceJ2000.current} userControlsRef={userControlsRef}/>

        {/* Camera Controls */}
        {controlsLoaded && <UserControls
        orbitControlsRef={orbitControlsRef}
        ref={userControlsRef} 
        followBody={followBody} 
        setFollowBody={setFollowBody} 
        setTableData={setTableData} 
        setIsPlanetaryInfoVisible={setIsPlanetaryInfoVisible}
        selectedBody={selectedBody}
        setSelectedBody={setSelectedBody}/> }

        
      </Canvas>
      </div>
    
        <Controls
         orbitControlsRef={orbitControlsRef}
         setIsPlanetaryInfoVisible={setIsPlanetaryInfoVisible}
         followingBody={followBody}
         setFollowBody={setFollowBody}
         currentDate={currentDate} 
         setCurrentDate={setCurrentDate}
         timeMultiplier={timeMultiplier}
         onChangeTimeMultiplier={handleTimeMultiplier}
         selectedBody={selectedBody}
         notToScale={!isToScale}
         setToScale={setToScale}
         />

      

    </div>
  );
}

export default App;
