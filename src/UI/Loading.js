import React, { useState, useEffect, useRef } from 'react';
import {useThree} from "@react-three/fiber";
import Marquee from "react-fast-marquee";

import "../styles/loading.css"

function Loading() {

  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

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

  return (
    isVisible && (
    <div className='loading-container' ref={containerRef}>
        <img className={"SOL-ICON"} src={`${process.env.PUBLIC_URL}/Sol-icon.svg`} />
        <img className={"SOL-TEXT"} src={`${process.env.PUBLIC_URL}/Sol-text.svg`} />
    </div>
    )
  );
}

export default Loading;
