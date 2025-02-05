import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';

import "../styles/planetaryinfo.css"

function PlanetaryInfo() {

  return (
    <div className='planetaryinfo-container'>
        <div className="title-container">
            <h1 className="title">Earth</h1>
            <p>Terrestrial</p>
        </div>
        <div className="content">
            <hr/>
            <p>
                Earth is the third planet from the Sun and the only known celestial body that 
                supports life. Its diverse ecosystems, rich atmosphere, and liquid water make 
                it unique in the universe.
            </p>
            
        </div>
        
    </div>
  );
}

export default PlanetaryInfo;
