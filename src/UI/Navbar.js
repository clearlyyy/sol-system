import React, { useState, useEffect } from 'react';
import {useThree} from "@react-three/fiber";
import Marquee from "react-fast-marquee";

import "../styles/navbar.css"

function Navbar({userControlsRef}) {

    const [showPlanets, setShowPlanets] = useState(false);// For Planets Container
    const [showMoons, setShowMoons] = useState(false);// For Moons Container
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    const moons = {
        Mercury: [],
        Venus: [],
        Earth: ["Luna (The Moon)"],
        Mars: ["Phobos", "Deimos"],
        Jupiter: ["Io", "Europa", "Ganymede", "Callisto"],
        Saturn: ["Titan", "Enceladus", "Mimas", "Dione", "Rhea", "Tethys"],
        Uranus: ["Titania", "Oberon", "Ariel", "Umbriel", "Miranda"],
        Neptune: ["Triton", "Proteus", "Nereid"],
        Pluto: ["Charon", "Styx", "Nix", "Kerberos", "Hydra"]
    };

    const factsList = [
        "The Sun makes up more than 99% of the mass of our solar system.",
        "Jupiter is the largest planet in the solar system and has a mass 318 times that of Earth.",
        "Saturn's rings are made up of ice, rock, and dust particles.",
        "Venus has a surface temperature hotter than Mercury’s, despite being farther from the Sun.",
        "Mars has the largest volcano in the solar system, Olympus Mons.",
        "The asteroid belt between Mars and Jupiter contains millions of asteroids.",
        "Neptune's winds are the fastest in the solar system, reaching up to 1,200 miles per hour.",
        "Uranus rotates on its side, with its axis tilted at about 98 degrees.",
        "Mercury has no atmosphere and experiences extreme temperature fluctuations.",
        "Earth is the only known planet to support life.",
        "The moon Titan, orbiting Saturn, has lakes and rivers made of liquid methane.",
        "Pluto was reclassified as a dwarf planet by the International Astronomical Union in 2006.",
        "The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.",
        "The solar system's outermost boundary is called the Oort Cloud, a region filled with icy bodies.",
        "Earth's magnetic field helps protect it from the Sun's harmful solar winds.",
        "Venus has a day longer than its year, taking 243 Earth days to rotate once."
    ];



   
  const handlePlanetsClick = (event) => {
    setShowPlanets(false);
    const planetName = event.target.textContent;
    console.log("Moving to Planet: ", planetName);
    const planet = userControlsRef.current.getPlanetByName(planetName);
    userControlsRef.current.selectBody(planet);
    //focusOnPlanet(planetName);
  };

  const handleMoonsClick = (planet) => {
    setSelectedPlanet(selectedPlanet === planet  ? null : planet)
  }

  return (
    
    <div className="nav-container">

        {/* Top Portion of the Navbar */}
        <div className="nav-top">
            <div className="nav-top-left">
                <p>Sol System 0.8</p>  
            </div>
            <div className="nav-top-right">
                <a href="https://github.com/clearlyyy/sol-system">
                <i className="fa fa-github"></i>
                </a>
                <div className="fact-message-style">
                    <div className="scrollable-content">
                        <Marquee>
                            <p>The Sun makes up more than 99% of the mass of our solar system.</p>
                            <p>Jupiter is the largest planet in the solar system and has a mass 318 times that of Earth.</p>
                            <p>Saturn's rings are made up of ice, rock, and dust particles.</p>
                            <p>Venus has a surface temperature hotter than Mercury’s, despite being farther from the Sun.</p>
                            <p>Mars has the largest volcano in the solar system, Olympus Mons.</p>
                            <p>The asteroid belt between Mars and Jupiter contains millions of asteroids.</p>
                            <p>Neptune's winds are the fastest in the solar system, reaching up to 1,200 miles per hour.</p>
                            <p>Uranus rotates on its side, with its axis tilted at about 98 degrees.</p>
                            <p>Mercury has no atmosphere and experiences extreme temperature fluctuations.</p>
                            <p>Earth is the only known planet to support life.</p>
                            <p>The moon Titan, orbiting Saturn, has lakes and rivers made of liquid methane.</p>
                            <p>Pluto was reclassified as a dwarf planet by the International Astronomical Union in 2006.</p>
                            <p>The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.</p>
                            <p>The solar system's outermost boundary is called the Oort Cloud, a region filled with icy bodies.</p>
                            <p>Earth's magnetic field helps protect it from the Sun's harmful solar winds.</p>
                            <p>Venus has a day longer than its year, taking 243 Earth days to rotate once.</p>
                        </Marquee>
                    </div>
                </div>
                <a href="https://github.com/clearlyyy/sol-system">
                <i className="fa fa-moon"></i>
                </a>
            </div>
        </div>

        {/* Middle Portion of the Navbar */}
        <div className="nav-middle">
            <img src={"/SOL-logo.svg"}></img>
            <nav className='mainmenu'>
            <div className="nav-middle-button-container"
                onMouseEnter={() => setShowPlanets(true)} 
                onMouseLeave={() => setShowPlanets(false)}>
                <div className="nav-middle-button">
                    <h3><i className="fa fa-earth"></i> Planets</h3>
                    <div className="Planets" style={{ display: showPlanets ? 'block' : 'none' }}>
                    {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"].map((planet) => (
                        <h4 key={planet} onClick={handlePlanetsClick} className='Planet-Button'>
                            {planet}
                        </h4>
                    ))}
                    </div>
                </div>
            </div>
            <div className="nav-middle-button-container"
            onMouseEnter={() => setShowMoons(true)} 
            onMouseLeave={() => setShowMoons(false)}>
            
            <div className="nav-middle-button">
                <h3><i className="fa fa-moon"></i> Moons</h3>

                <div className="Planets" style={{ display: showMoons ? 'block' : 'none' }}>
                    <h3>Select a Host Planet: </h3>
                    <hr></hr>

                    {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"].map((planet) => (
                        <div key={planet}>
                            <h4 onClick={() => handleMoonsClick(planet)} className='Planet-Button'>
                                {planet}
                            </h4>

                            {selectedPlanet === planet && (
                                <ul className="Moons-List">
                                    {moons[planet].length > 0 ? (
                                        moons[planet].map((moon) => (
                                            <div className="Moon" onClick={handlePlanetsClick}>
                                                <li className="Moon-Text" key={moon}>{moon}</li>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="Moon">
                                            <li className="Moon-Text">No Moons</li>
                                        </div>
                                    )}
                                </ul>
                            )}
                        </div>
                    ))}    
                </div>
            </div>
        </div>

            <div className="nav-middle-button-container">
                <div className="nav-middle-button">
                    <h3><i className="fa fa-wrench"></i> Tools</h3>
                </div>
            </div>
            </nav>   
        </div>
        

    </div>
  );
}

export default Navbar;
