import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';
import DropList from "./DropList"
import { DynamicTable } from './DynamicTable';

import "../styles/planetaryinfo.css"

function PlanetaryInfo({tableData, isVisible, setIsVisible, selectedObject}) {
  
  const hidePlanetaryInfo = () => {
    setIsVisible(false);
  }

  return (
    <div className={`planetaryinfo-container ${isVisible ? 'visible' : ''}`}>
        <div className="title-container">
          <div className="title">
            <h1 className="title">{selectedObject?.name}</h1>
            <i onClick={hidePlanetaryInfo} class="fa fa-angle-double-left"></i>
            </div>
            <p>{selectedObject?.userData.type}</p>
        </div>
        <div className="content">
            <hr/>
            <p>
                {selectedObject?.userData.description}
            </p>
            <DropList name={"Physical Characteristics"}>
              <DynamicTable selectedBody={selectedObject} type={"Physical Characteristics"}/>
            </DropList>
            <br></br>
            <DropList name={"Orbital Information"}>
              <DynamicTable selectedBody={selectedObject} type={"Orbital Information"}/>
            </DropList>
            
            
        </div>
        
    </div>
  );
}

export default PlanetaryInfo;
