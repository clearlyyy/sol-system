import React, { useState, useEffect, useRef } from 'react';
import {useThree} from "@react-three/fiber";
import Marquee from "react-fast-marquee";

import "../styles/selectionmenu.css"

function MoonsSelection({userControlsRef, showSelection, setShowSelection}) {

    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [moons, setMoons] = useState([]);
    const [message, setMessage] = useState("");

    const planetMoons = {
        Mercury: [],
        Venus: [],
        Earth: ["Luna (The Moon)"],
        Mars: ["Phobos", "Deimos"],
        Jupiter: ["Io", "Europa", "Ganymede", "Callisto"],
        Saturn: ["Titan", "Enceladus", "Mimas", "Dione", "Rhea", "Tethys"],
        Uranus: ["Titania", "Oberon", "Ariel", "Umbriel", "Miranda"],
        Neptune: ["Triton"],
        Pluto: []
    };

    const handlePlanetClick = (planetName) => {
        if (selectedPlanet === planetName) {
            setSelectedPlanet(null);
            setMoons([]);
            setMessage("");
        } else {
        setSelectedPlanet(planetName);
        const moonsList = planetMoons[planetName];
        if (moonsList.length === 0) {
            setMessage(`${planetName} has no major moons.`);
            setMoons([]);
        } else {
            setMessage("");
            setMoons(moonsList);
        }
    }
    }

    const handleMoonClick = (moonName) => {
        const moon = userControlsRef.current.getPlanetByName(moonName);
        userControlsRef.current.selectBody(moon);
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
            <h2>Select a Host Body</h2>
            <i onClick={hideScreen} class="fa fa-times"></i>
        </div>
        <hr/>
        {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"].map((planet) => (
                <div key={planet} 
                    onClick={() => handlePlanetClick(planet)} 
                    className={`planet-select ${selectedPlanet === planet ? "planet-selected" : ""}`}>
                    <h3>{planet} <i className={`fas fa-chevron-${selectedPlanet === planet ? "up" : "down"}`}></i></h3>
                    {/* Display moons underneath the planet */}
                    {selectedPlanet === planet && (
                        <div className="moons-list">
                            {moons.length > 0 ? (
                                <ul>
                                    {moons.map((moon, index) => (
                                        <h4 className="moon" key={index} onClick={() => handleMoonClick(moon)}>{moon}</h4>
                                    ))}
                                </ul>
                            ) : (
                                <p className="moon">{message}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
    </div>
  );
}

export default MoonsSelection;
