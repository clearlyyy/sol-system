import React, { useState, useEffect, useRef } from 'react';
import {useThree} from "@react-three/fiber";
import Marquee from "react-fast-marquee";

import "../styles/selectionmenu.css"

function PlanetsSelection({userControlsRef, showSelection, setShowSelection}) {

    const [isAnimating, setIsAnimating] = useState(false);

    const handlePlanetClick = (planetName) => {
        const planet = userControlsRef.current.getPlanetByName(planetName);
        userControlsRef.current.selectBody(planet);

        setIsAnimating(true);
        setShowSelection(false);
    }

    const hideScreen = () => {
        setIsAnimating(true);
        setShowSelection(false);
    }

    if (showSelection && isAnimating) {
        setIsAnimating(false);
    }

  return (
    <div className={`selectionContainer ${isAnimating ? "animate-off-screen" : ""} ${showSelection ? "animate-on-screen" : ""}`}>
        <div className="Title">
            <h2>Select a Planet</h2>
            <i onClick={hideScreen} class="fa fa-times"></i>
        </div>
        <hr/>
        <div onClick={() => handlePlanetClick("Mercury")} className="planet-select"><h3>Mercury</h3></div>
        <div onClick={() => handlePlanetClick("Venus")} className="planet-select"><h3>Venus</h3></div>
        <div onClick={() => handlePlanetClick("Earth")} className="planet-select"><h3>Earth</h3></div>
        <div onClick={() => handlePlanetClick("Mars")} className="planet-select"><h3>Mars</h3></div>
        <div onClick={() => handlePlanetClick("Jupiter")} className="planet-select"><h3>Jupiter</h3></div>
        <div onClick={() => handlePlanetClick("Saturn")} className="planet-select"><h3>Saturn</h3></div>
        <div onClick={() => handlePlanetClick("Uranus")} className="planet-select"><h3>Uranus</h3></div>
        <div onClick={() => handlePlanetClick("Neptune")} className="planet-select"><h3>Neptune</h3></div>
        <div onClick={() => handlePlanetClick("Pluto")} className="planet-select"><h3>Pluto</h3></div>
    </div>
  );
}

export default PlanetsSelection;
