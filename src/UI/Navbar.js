import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";

import "../styles/navbar.css"

function Navbar() {
  

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
            <div className="nav-middle-button-container">
                <div className="nav-middle-button">
                    <h3><i className="fa fa-earth"></i> Planets</h3>
                </div>
            </div>
            <div className="nav-middle-button-container">
                <div className="nav-middle-button">
                    <h3><i className="fa fa-moon"></i> Moons</h3>
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
