import React, { useState, useEffect, useRef } from 'react';
import {useThree} from "@react-three/fiber";
import Marquee from "react-fast-marquee";

import "../styles/loading.css"

function Loading() {

  const loadingStates = ["Loading.", "Loading..", "Loading..."];
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [index, setIndex] = useState(2);
  const containerRef = useRef(null);
  const container2Ref = useRef(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % loadingStates.length);
    }, 200);
  }, []);

  useEffect(() => {
    const loadingContainer = containerRef.current;
    if (!loadingContainer) return;
    const handleAnimationEnd = (event) => {
        if (event.animationName === "expand") {
            setIsVisible(false);
        }
    };

    loadingContainer.addEventListener('animationend', handleAnimationEnd);

    return () => {
        loadingContainer.removeEventListener('animationend', handleAnimationEnd);
    };

  }, [])

  useEffect(() => {
    const loadingContainer = container2Ref.current;
    if (!loadingContainer) return;
    const handleAnimationEnd = (event) => {
        if (event.animationName === "expand") {
            setIsVisible2(false);
        }
    };

    loadingContainer.addEventListener('animationend', handleAnimationEnd);

    return () => {
        loadingContainer.removeEventListener('animationend', handleAnimationEnd);
    };

  }, [])

  return (
    <div>
    { isVisible && 
    <div className='loading-container' ref={containerRef}>
        <img className={"SOL-ICON"} src={`${process.env.PUBLIC_URL}/SOL-icon.svg`} />
        <img className={"SOL-TEXT"} src={`${process.env.PUBLIC_URL}/SOL-text.svg`} />
    </div>
    }
    { isVisible2 && 
    <div className='loading-text-container' ref={container2Ref}>
      <h3>{loadingStates[index]}</h3>
      <p>The site may lag whilst objects are loaded in.</p>
    </div>
    }
    </div>
  );
}

export default Loading;
