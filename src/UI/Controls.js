import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"

import "../styles/controls.css"
import "../styles/timeslider.css"

function Controls({currentDate, timeMultiplier, onChangeTimeMultiplier, }) {

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th'; // for 11th, 12th, 13th
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      }
      
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

      function convertMultiplierToRate(timeMultiplier) {
        //Implement this. 1x = 1sec/sec, etc.

        
        return null;
      }


  return (
    <div className="controls-container">
        <div className="time-speed-container">
            <h3 className="current-date">{formatDateWithLocale(currentDate)}</h3>
            <div className="multiplier-container">
                <button onClick={() => onChangeTimeMultiplier(timeMultiplier / 2)} className="time-button">-</button>
                <h1>{timeMultiplier}x</h1>
                <button onClick={() => onChangeTimeMultiplier(timeMultiplier * 2)} id="plus-time" className="time-button">+</button>
            </div>
        </div>
    </div>
  );
}

export default Controls;
