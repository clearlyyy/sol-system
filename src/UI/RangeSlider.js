import React, { useRef, useState, useEffect } from "react";
import { timeMultipliers } from "./timeMultipliers";
import "../styles/timeslider.css"


const DraggablePath = ({ setTimeMultiplier }) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const circleRef = useRef(null);
  var animationFrame = useRef(null); // Ref to store the current animation frame ID
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);


  useEffect(() => {
    if (!pathRef.current) return;
    updateCirclePosition(0.5); // Start at the middle of the path
  }, []);

  const getClosestPointOnPath = (clientX, clientY) => {
    if (!pathRef.current) return { x: 0, y: 0 };
  
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    let minDist = Infinity;
    let closestPoint = { x: 0, y: 0 };
    let closestLength = 0;
  
    for (let i = 0; i <= pathLength; i += 3) { // ✅ Skip 5 pixels to reduce calculations
      let pt = path.getPointAtLength(i);
      let dx = pt.x - clientX;
      let dy = pt.y - clientY;
      let dist = Math.sqrt(dx * dx + dy * dy);
  
      if (dist < minDist) {
        minDist = dist;
        closestPoint = pt;
        closestLength = i;
      }
    }
  
    return { ...closestPoint, progress: closestLength / pathLength };
  };
  
  
  const updateCirclePosition = (progress) => {
    if (!pathRef.current || !circleRef.current) return;

    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(progress * pathLength);

      circleRef.current.setAttribute("cx", point.x);
      circleRef.current.setAttribute("cy", point.y);

      // Map the progress to the dictionary keys
      const index = Math.min(Math.floor(Math.abs(progress - 0.5) * (Object.keys(timeMultipliers).length - 1) * 2), Object.keys(timeMultipliers).length - 1);
      let newSliderValue = Object.keys(timeMultipliers)[index];

      // If progress is less than 0.5 (left side), make the value negative
      if (progress < 0.5) {
        newSliderValue = -newSliderValue;
      } else if (progress === 0.5) {
        newSliderValue = 1; // The center (1x)
      }

      setSliderValue(newSliderValue);
      setTimeMultiplier(newSliderValue); // Update the parent state with the new multiplier
    });
  };
  
  
  

  const handleMouseMove = (event) => {
    if (!isDragging || !svgRef.current) return;

    let svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    let transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());

    let { x, y, progress } = getClosestPointOnPath(transformedPoint.x, transformedPoint.y);
    updateCirclePosition(progress);
  };

  const handleTouchMove = (event) => {
    if (!isDragging || !svgRef.current) return;
  
    let touch = event.touches[0]; // Get first touch point
    let svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = touch.clientX;
    svgPoint.y = touch.clientY;
    let transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());
  
    let { progress } = getClosestPointOnPath(transformedPoint.x, transformedPoint.y);
    updateCirclePosition(progress);
  };
  

  return (
    <div className="time-slider">
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="80 280 340 70" // Adjusted to fit the arc
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >

      {/* Arc Path with Custom Color and Thickness */}
      <path
        ref={pathRef}
        d="M100,300 Q250,350 400,300"
        fill="none"
        stroke="#8d9fc4"  // Custom color for the arc
        strokeWidth="8"  // Thicker stroke
        strokeLinecap="round" // Rounded ends
      />

      {/* Draggable Circle with Custom Color */}
      <circle
        ref={circleRef}
        r="12" // Slightly larger circle
        fill="#93b54a" // Custom color for the circle
        cursor="grab"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      />
    </svg>
    </div>
  );
};

export default DraggablePath;
