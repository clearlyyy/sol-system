import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';
import DropList from "./DropList"
import { DynamicTable } from './DynamicTable';

import "../styles/planetaryinfo.css"

function PlanetaryInfo({tableData, isVisible, selectedObject}) {
  

  return (
    <div className={`planetaryinfo-container ${isVisible ? 'visible' : ''}`}>
        <div className="title-container">
            <h1 className="title">{selectedObject?.name}</h1>
            <p>{selectedObject?.userData.type}</p>
        </div>
        <div className="content">
            <hr/>
            <p>
                {selectedObject?.userData.description}
            </p>
            <DropList>
              <DynamicTable data={tableData}/>
            </DropList>
            
            
        </div>
        
    </div>
  );
}

export default PlanetaryInfo;
