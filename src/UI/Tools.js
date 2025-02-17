import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';
import DropList from "./DropList"
import { DynamicTable } from './DynamicTable';

import "../styles/tools.css"
import "../styles/planetaryinfo.css"

import { scalingFactor, sunScaling, planetScaling, moonOrbitalPathScaling } from '../App';
import EditableSetting from './EditableSetting';

function Tools({
    isVisible, 
    setIsVisible,
    handlePlanetScalingChange,
    handleMoonOrbitalPathScalingChange,
    showPerf,
    setShowPerf
    }) {
  
  const hideTools = () => {
    setIsVisible(false);
  }

  return (
    <div className={`tools-container ${isVisible ? 'visible' : ''}`}>
      <div className="mobile-margin">
        <div className="title-container">
            <div className="title">
                  <h1 className="title">Tools</h1>
                  <i onClick={hideTools} class="fa fa-angle-double-right"></i>
            </div>
            <p>Alter your view on the solar system.</p>
        </div>
        <div className='content'>
            <hr/>
            <p className="disclaimer">Note: Changing these settings may cause instability and visual artifacts</p>
            <div className="setting-container">
                <EditableSetting title="Planet Scaling" value={planetScaling} onChange={handlePlanetScalingChange}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="1" 
                 max="1000" 
                 step="1"
                 value={planetScaling} 
                 onChange={(e) => handlePlanetScalingChange(Number(e.target.value))}
                />
                <EditableSetting title="Moon Orbital Path Scaling" value={moonOrbitalPathScaling} onChange={handleMoonOrbitalPathScalingChange}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="1" 
                 max="10" 
                 step="0.05"
                 value={moonOrbitalPathScaling} 
                 onChange={(e) => handleMoonOrbitalPathScalingChange(Number(e.target.value))}
                />
                <hr></hr>
                <p>Show Performance Stats <input type="checkbox" checked={showPerf} onChange={(e) => setShowPerf(e.target.checked)}></input></p>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Tools;
