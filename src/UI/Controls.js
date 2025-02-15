import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"
import { timeMultipliers } from './timeMultipliers';

import DraggablePath from './RangeSlider';

import "../styles/controls.css"
import "../styles/timeslider.css"

function Controls({currentDate, setCurrentDate, timeMultiplier, onChangeTimeMultiplier, followingBody, setFollowBody, setIsPlanetaryInfoVisible, selectedBody, notToScale, setToScale }) {


    const [currentTimeMultiplier, setCurrentTimeMultiplierState] = useState("");
    const [selectedName, setSelectedName] = useState(null);
    const multiplierKeys = Object.keys(timeMultipliers).map(Number);

    const [isLive, setisLive] = useState(true);

    useEffect(() => {
      const now = new Date();
      const dif = Math.abs(now - currentDate);
      if (dif > 60000) {
        setisLive(false);
      }
    }, [currentDate])


    function setToLive() {
      console.log("Going to Live");
      setisLive(true);
      const date = new Date()
      setCurrentDate(date);
      setCurrentTimeMultiplierState("REAL TIME");
      onChangeTimeMultiplier(1);
    }


    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th'; // for 11th, 12th, 13th
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      }

      const getCurrentIndex = () => {
        const absoluteMultiplier = Math.abs(timeMultiplier);
        return multiplierKeys.indexOf(absoluteMultiplier);
      };
    

      const increaseMultiplier = () => {
      setisLive(false);
      const absVal = Math.abs(timeMultiplier);
      let currentIndex = multiplierKeys.indexOf(absVal);
      if (timeMultiplier >= 0) {
        // When positive, if not at the maximum, move to the next value.
        if (currentIndex < multiplierKeys.length - 1) {
          onChangeTimeMultiplier(multiplierKeys[currentIndex + 1]);
        }
      } else {
        // When negative, if at –1 then flip to positive 1.
        if (currentIndex === 0) {
          onChangeTimeMultiplier(1);
        } else {
          // Otherwise, reduce the absolute value (move “up” the sorted list) keeping it negative.
          onChangeTimeMultiplier(-multiplierKeys[currentIndex - 1]);
        }
      }
    };

    // Decrease multiplier:
    // • When positive:
    //    – If above 1, move to the previous (lower) key.
    //    – If exactly 1, flip the sign to negative (to –1).
    // • When negative, move to a larger absolute value (i.e. next key in the sorted order).
    const decreaseMultiplier = () => {
      setisLive(false);
      const absVal = Math.abs(timeMultiplier);
      let currentIndex = multiplierKeys.indexOf(absVal);
      if (timeMultiplier > 0) {
        if (absVal === 1) {
          // If at 1× and decrement is clicked, flip to -1×.
          onChangeTimeMultiplier(-1);
        } else if (currentIndex > 0) {
          // Otherwise, move to the previous (lower) positive value.
          onChangeTimeMultiplier(multiplierKeys[currentIndex - 1]);
        }
      } else {
        // When negative, if not at the bottom, increase the absolute value.
        if (currentIndex < multiplierKeys.length - 1) {
          onChangeTimeMultiplier(-multiplierKeys[currentIndex + 1]);
        }
      }
    };

      function formatDateWithLocale(date) {
        // Format date with month, day, and year
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
      
        // Get the day and add the suffix
        const day = date.getDate();
        const suffix = getDaySuffix(day);
        const dayWithSuffix = formattedDate.replace(/\d+/, day + suffix);
      
        // Format the time (hours, minutes, and seconds)
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
      
        // Combine the date and time
        return `${dayWithSuffix}, ${formattedTime}`;
      }
      
      useEffect(() => {
        if (timeMultiplier > 0) {
          setCurrentTimeMultiplierState(timeMultipliers[timeMultiplier]);
        }
        else if (timeMultiplier == -1) {
          setCurrentTimeMultiplierState("-1 SEC/S")
        }
        else if (timeMultiplier < 0) {
          setCurrentTimeMultiplierState("-" + timeMultipliers[timeMultiplier * -1])
        }

        console.log(currentTimeMultiplier);

      }, [timeMultiplier])

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          if (selectedBody === null) {
            setSelectedName("Body");
          } else {
            setSelectedName(selectedBody.name);
          }
        }, 1000); // Adjust the 1000 value (in milliseconds) to the desired delay time

        return () => clearTimeout(timeoutId);
      }, [selectedBody]);
      


      

  return (
    <>
    <div className="live-container">       
      <h4 
        onClick={() => setToLive()}
        className={`live-text ${isLive ? "live" : ""}`}>
        <i className={`fa fa-circle live-circle ${isLive ? "live" : ""}`}> </i> 
         LIVE
        </h4>
    </div>

    { notToScale && <div title="You altered some settings in the Tools Menu, change them back to 1x for proper scaling" className="notscale-container">       
      <h4 
        onClick={() => setToScale()}
        className={`live-text.live`}>
        <i className={`fa fa-circle live-circle ${isLive ? "live" : ""}`}> </i> 
         NOT TO SCALE
        </h4>
    </div> }
    <div className="controls-container">
          <div className={`following-body-container ${followingBody ? 'visible' : ''}`}>       
            <h4 
              onClick={() => {setFollowBody(false); setIsPlanetaryInfoVisible(false)}} 
              className="follow-body-text">
              <i className="fa fa-circle follow-body-circle"> </i> 
               Following {selectedName}
              </h4>
          </div>
        <div className="time-speed-container">
            <h3 className="current-date">{formatDateWithLocale(currentDate)}</h3>
            <div className="multiplier-container">

                <h1 className="time-display">{currentTimeMultiplier}</h1>

            </div>
            <DraggablePath setisLive={setisLive} setTimeMultiplier={onChangeTimeMultiplier} currentTimeMultiplier={currentTimeMultiplier}/>
        </div>
    </div>
    </>
  );
}

export default Controls;
