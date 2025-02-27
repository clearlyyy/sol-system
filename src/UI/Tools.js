import React, { useState, useEffect, useContext } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';
import DropList from "./DropList"
import { DynamicTable } from './DynamicTable';
import { useThree } from "@react-three/fiber"
import { SceneContext } from '../App';

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
    setShowPerf,
    selectedBody
    }) {

  const hideTools = () => {
    setIsVisible(false);
  }

  function resetDefaultSettings() {
    handlePlanetScalingChange(1);
    handleMoonOrbitalPathScalingChange(1);
    selectedBody.userData.setSemiMajorAxis(selectedBody.userData.initA);
    selectedBody.userData.setEccentricity(selectedBody.userData.initEC);
    selectedBody.userData.setInclination(selectedBody.userData.initi);
    selectedBody.userData.setomega(selectedBody.userData.initomega);
    selectedBody.userData.setOmega(selectedBody.userData.initOmega);
    selectedBody.userData.setmeanMotion(selectedBody.userData.initmeanMotion);
  }

  return (
    <div className={`tools-container ${isVisible ? 'visible' : ''}`}>
      <div className="mobile-margin">
        <div className="title-container">
            <div className="title">
                  <h1 className="title">Tools</h1>
                  <i onClick={hideTools} class="fa fa-angle-double-down hideInfo"></i>
            </div>
            <p>Alter your view on the solar system.</p>
        </div>
        <div className='content'>
            <hr/>
            <p className="disclaimer">Note: Changing these settings may cause instability and visual artifacts</p>
            <div className="setting-container">
              {selectedBody?.userData.name && <h4 onClick={() => resetDefaultSettings()}
                className={`reset-text`}>
                 Reset {selectedBody?.userData.name} to Default Settings
              </h4> }
                <EditableSetting unit={"x"}title="Planet Scaling" value={planetScaling} onChange={handlePlanetScalingChange}/>
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
                <EditableSetting unit={"x"}title="Moon Orbital Path Scaling" value={moonOrbitalPathScaling} onChange={handleMoonOrbitalPathScalingChange}/>
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
                <div className="selectedBody-container"><h3 className="selected">Selected Body: </h3>{selectedBody ? <h3 className='selected'>{selectedBody.name}</h3> : <h3 className='selected'>No Object Selected</h3>}</div>
                {selectedBody != null && selectedBody.name != "Sun" && (
                  <div>

                    <EditableSetting multiplier={149.6e6} unit=" AU"title="Semi Major Axis (A)" value={(selectedBody?.userData.A / 149.6e6).toFixed(4)} onChange={selectedBody?.userData.setSemiMajorAxis}/>
                {selectedBody?.userData?.moon ? (
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="1" 
                 max="39999999" 
                 step="1"
                 value={selectedBody?.userData.A} 
                 onChange={(e) => selectedBody?.userData.setSemiMajorAxis(Number(e.target.value))}
                />
                ) : (
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="1" 
                 max="3999999996" 
                 step="1"
                 value={selectedBody?.userData.A} 
                 onChange={(e) => selectedBody?.userData.setSemiMajorAxis(Number(e.target.value))}
                />
                )}


                <EditableSetting unit=""title="Eccentricity (EC)" value={(selectedBody?.userData.EC).toFixed(3)} onChange={selectedBody?.userData.setEccentricity}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="0" 
                 max="0.99" 
                 step="0.001"
                 value={selectedBody?.userData.EC} 
                 onChange={(e) => selectedBody?.userData.setEccentricity(Number(e.target.value))}
                />
                <EditableSetting unit="°"title="Inclination (I)" value={(selectedBody?.userData.i).toFixed(2)} onChange={selectedBody?.userData.setInclination}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="0" 
                 max="180" 
                 step="0.1"
                 value={selectedBody?.userData.i} 
                 onChange={(e) => selectedBody?.userData.setInclination(Number(e.target.value))}
                />
                <EditableSetting unit="°"title="Arg. of Periapsis (ω)" value={(selectedBody?.userData.omega).toFixed(2)} onChange={selectedBody?.userData.setomega}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="0" 
                 max="360" 
                 step="0.1"
                 value={selectedBody?.userData.omega} 
                 onChange={(e) => selectedBody?.userData.setomega(Number(e.target.value))}
                />
                <EditableSetting unit="°"title="Lon. of Ascending Node (Ω)" value={(selectedBody?.userData.Omega).toFixed(2)} onChange={selectedBody?.userData.setOmega}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="0" 
                 max="360" 
                 step="0.1"
                 value={selectedBody?.userData.Omega} 
                 onChange={(e) => selectedBody?.userData.setOmega(Number(e.target.value))}
                />
                <EditableSetting unit="deg/day"title="Mean Motion (n)" value={(selectedBody?.userData.meanMotion).toFixed(4)} onChange={selectedBody?.userData.setmeanMotion}/>
                <input 
                 className="slider"
                 id="planet-scaling-slider"
                 type="range" 
                 min="0" 
                 max="20" 
                 step="0.01"
                 value={selectedBody?.userData.meanMotion} 
                 onChange={(e) => selectedBody?.userData.setmeanMotion(Number(e.target.value))}
                /> </div>)}
            </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
        </div>
      </div>
    </div>
  );
}

export default Tools;
