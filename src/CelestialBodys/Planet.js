//Planet.js - Handles everything to do with planets.


import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useLoader, useFrame } from "@react-three/fiber";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { TextureLoader } from "three";
import { SphereGeometry, ShaderMaterial, DoubleSide, MeshStandardMaterial, Line, LineLoop, BufferGeometry, LineBasicMaterial, Vector3, Float32BufferAttribute } from "three";
import { moonOrbitalPathScaling, planetScaling, scalingFactor } from "../App"
import { getFresnelMat } from "../Shaders/getFresnelMat";

import EarthCloud from '../Shaders/EarthClouds'
import generateAtmosphereMaterial, { atmosphereMaterial } from "../Shaders/AtmosphericShader"
import FakeGlowMaterial from "../Shaders/FakeGlowMaterial";
import OrbitalLine from "./OrbitalLine";
import PlanetIndicator from "./PlanetIndicator";


const degToRad = (deg) => deg * (Math.PI / 180);



// Function to generate orbital path based on Keplerian elements
const generateOrbitalPath = (A, EC, i, omega, Omega, numPoints = 500) => {
  const points = [];
  
  // Convert the angles from degrees to radians
  const iRad = THREE.MathUtils.degToRad(i);       // Inclination
  const omegaRad = THREE.MathUtils.degToRad(omega);  // Argument of perihelion
  const OmegaRad = THREE.MathUtils.degToRad(Omega);  // Longitude of ascending node
  
  // Generate points based on the orbit equation
  for (let j = 0; j < numPoints; j++) {
    // True anomaly varies from 0 to 2 * Pi (360 degrees)
    const theta = (j / numPoints) * Math.PI * 2;
    
    // Orbital distance (r) using the elliptical orbit formula
    const r = A * (1 - EC * EC) / (1 + EC * Math.cos(theta));
    
    // Convert to Cartesian coordinates (in 2D orbit plane)
    let xOrbital = r * Math.cos(theta);
    let yOrbital = r * Math.sin(theta);
    let zOrbital = 0;  // Assume the orbit lies in the ecliptic plane for simplicity

    // Apply the rotations for the orbital parameters (i, omega, Omega)
    
    // Apply the argument of perihelion (omega) and inclination (i)
    const x1 = xOrbital * Math.cos(omegaRad) - yOrbital * Math.sin(omegaRad);
    const y1 = xOrbital * Math.sin(omegaRad) + yOrbital * Math.cos(omegaRad);
    
    // Apply the inclination (i)
    const x2 = x1;
    const y2 = y1 * Math.cos(iRad) - zOrbital * Math.sin(iRad);
    const z2 = y1 * Math.sin(iRad) + zOrbital * Math.cos(iRad);
    
    // Apply the longitude of the ascending node (Omega)
    const x3 = x2 * Math.cos(OmegaRad) - y2 * Math.sin(OmegaRad);
    const y3 = x2 * Math.sin(OmegaRad) + y2 * Math.cos(OmegaRad);
    const z3 = z2;  // No rotation around z-axis for ascending node
    
    // Rotate the orbit by 90 degrees around the X-axis (to make the orbit horizontal)
    const xFinal = x3;
    const yFinal = z3;  // Swap y and z to rotate 90 degrees around X-axis
    const zFinal = -y3; // Negate the original y to complete the rotation
    
    points.push(new THREE.Vector3(xFinal, yFinal, zFinal)); // 3D coordinates
  }
  points.push(points[0]); // close the loop.

  return points;
};

function getCurrentRotation(daysSinceJ2000, j2000Rotation, offset, siderealRotation) {
  const rotationPerDay = (360 / siderealRotation) * 24;

  const totalRotation = j2000Rotation + (rotationPerDay * daysSinceJ2000);
  const currentRotation = (totalRotation - offset) % 360;
  return currentRotation < 0 ? currentRotation + 360 : currentRotation;
}



function Planet({
    setHostPosition,
    userControlsRef,
    distanceThreshold,
    name,
    textureUrl,
    bumpMapUrl,
    specMapUrl,
    size,
    rotationSpeed,
    orbitSpeed,
    tilt,
    orbitRadius,
    color,
    atmosphereColor = new THREE.Color(0xaaaaaa), // Default color for atmosphere
    atmosphereSize,
    initA,
    initEC,
    initi,
    initomega,
    initOmega,
    initmeanMotion,
    j2000MeanAnomaly,
    j2000TrueAnomaly,
    j2000Rotation,
    siderealPeriod,
    targetId,
    children,
    hasClouds,
    daysSinceJ2000,
    type,
    description,
    mass,
    gravity,
    density,
    escapeVelocity,
    meanTempDay,
    meanTempNight
}) {

    const [A, setA] = useState(initA);
    const [EC, setEC] = useState(initEC);
    const [i, seti] = useState(initi);
    const [omega, setomega] = useState(initomega);
    const [Omega, setOmega] = useState(initOmega);
    const [meanMotion, setmeanMotion] = useState(initmeanMotion);

    const [meanAnomaly, setMeanAnomaly] = useState((j2000MeanAnomaly + (meanMotion * daysSinceJ2000)) % 360);
    const [trueAnomaly, setTrueAnomaly] = useState(calcTrueAnomaly(daysSinceJ2000, meanMotion, j2000MeanAnomaly, EC));
    const [points, setPoints] = useState(generateOrbitalPath(A / scalingFactor, EC, i, omega, Omega));
    const [fresnelMat, setFresnelMat] = useState(getFresnelMat(atmosphereColor, 0x000000, 0.01, 0.5, planetScaling));
    const [scaledSize, setScaledSize] = useState(size / scalingFactor);

    function calcTrueAnomaly(daysSinceJ2000, meanMotion, j2000MeanAnomaly, eccentricity) {
      //First find the Mean Anomaly of the planet.
      var meanAnomaly = (j2000MeanAnomaly + (meanMotion * daysSinceJ2000)) % 360;

      //Now we use the Mean Anomaly and Eccentricity of the planet and its orbit to get a true anomaly.
      let M = meanAnomaly * (Math.PI / 180);
      let E = M;
      let delta = 1;
      const tolerance = 1e-6;

      while (Math.abs(delta) > tolerance) {
          delta = (E - eccentricity * Math.sin(E) - M) / (1 - eccentricity * Math.cos(E));
          E -= delta;
      }

      const nu = 2 * Math.atan2(
          Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
          Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
      );

      return nu * (180 / Math.PI);
    }

    useEffect(() => {
      setTrueAnomaly(calcTrueAnomaly(daysSinceJ2000, meanMotion, j2000MeanAnomaly, EC));
      setMeanAnomaly((j2000MeanAnomaly + (meanMotion * daysSinceJ2000)) % 360);
    }, [daysSinceJ2000, meanMotion, j2000MeanAnomaly, EC])

    const planetRef = useRef();
    const atmosphereRef = useRef();

    // Load texture
    const texture = useLoader(TextureLoader, process.env.PUBLIC_URL + textureUrl);
    const ring_texture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/rings.png");
    

    

    useEffect(() => {
        if (planetRef.current) {
            planetRef.current.rotation.x = degToRad(-tilt || 0);
        }
    }, [tilt]);

    useEffect(() => {
      const rot = getCurrentRotation(daysSinceJ2000, j2000Rotation, 55, siderealPeriod);
      planetRef.current.rotation.y = degToRad(rot);
    }, [daysSinceJ2000])

  
      
    const calculatePositionFromTrueAnomaly = (A, EC, theta, i, omega, Omega) => {
      // Convert angles from degrees to radians
      const iRad = THREE.MathUtils.degToRad(i);
      const omegaRad = THREE.MathUtils.degToRad(omega);
      const OmegaRad = THREE.MathUtils.degToRad(Omega);
    
      // Calculate the radial distance using the orbital equation
      const r = (A * (1 - EC * EC)) / (1 + EC * Math.cos(theta));
    
      // Convert to Cartesian coordinates in the orbital plane
      const xOrbital = r * Math.cos(theta);
      const yOrbital = r * Math.sin(theta);
      const zOrbital = 0;
    
      // Apply the rotations for the orbital parameters (i, omega, Omega)
      const x1 = xOrbital * Math.cos(omegaRad) - yOrbital * Math.sin(omegaRad);
      const y1 = xOrbital * Math.sin(omegaRad) + yOrbital * Math.cos(omegaRad);
    
      const x2 = x1;
      const y2 = y1 * Math.cos(iRad) - zOrbital * Math.sin(iRad);
      const z2 = y1 * Math.sin(iRad) + zOrbital * Math.cos(iRad);
    
      const x3 = x2 * Math.cos(OmegaRad) - y2 * Math.sin(OmegaRad);
      const y3 = x2 * Math.sin(OmegaRad) + y2 * Math.cos(OmegaRad);
      const z3 = z2;
    
      // Rotate the orbit by 90 degrees around the X-axis (to make the orbit horizontal)
      const xFinal = x3;
      const yFinal = z3;  // Swap y and z to rotate 90 degrees around X-axis
      const zFinal = -y3; // Negate the original y to complete the rotation
    
      return new THREE.Vector3(xFinal, yFinal, zFinal);
    };

    useFrame(() => {
      if (planetRef.current) {
        const trueAnomaly2 = degToRad(trueAnomaly); 
        const position = calculatePositionFromTrueAnomaly(A / scalingFactor, EC, trueAnomaly2, i, omega, Omega);
        planetRef.current.position.copy(position);
      }
    }); 

    
    useEffect(() => {
        setPoints(generateOrbitalPath(A / scalingFactor, EC, i, omega, Omega)); // Generate points based on Keplerian data
    },[]) 

    useEffect(() => {
      if (planetRef.current) {
        planetRef.current.userData = {
          name,
          size,
          tilt,
          A,
          EC,
          i,
          omega,
          Omega,
          meanMotion,
          initA,
          initEC,
          initi,
          initomega,
          initOmega,
          initmeanMotion,
          j2000MeanAnomaly,
          targetId,
          hasClouds,
          meanAnomaly,
          trueAnomaly,
          type,
          description,
          mass,
          gravity,
          density,
          escapeVelocity,
          siderealPeriod,
          meanTempDay,
          meanTempNight,
          setSemiMajorAxis: setA,
          setEccentricity: setEC,
          setInclination: seti,
          setomega, setomega,
          setOmega, setOmega,
          setmeanMotion, setmeanMotion
        };
      }
    }, [size, name, trueAnomaly, meanAnomaly]);

    

    //Get The Planets Position for its moons.
    useFrame(() => {
      if (planetRef.current && setHostPosition)
      {
        const worldPosition = new THREE.Vector3;
        planetRef.current.getWorldPosition(setHostPosition.current);
        
      }
    })

    //Regenerate the Orbital path if any properties change.
    useEffect(() => {
      setPoints(generateOrbitalPath(A / scalingFactor, EC, i, omega, Omega));
      console.log("Generating new Orbital Path for " + name);
    }, [A, EC, i, omega, Omega, meanMotion])
    
    return (
      <>
          <group>
            {/* Orbit Path */}
            <OrbitalLine points={points} color={color}/>
          

          {/* Planet and atmosphere */}
          <mesh ref={planetRef} name={name} position={[0, 0, 0]}>
            <sphereGeometry args={[scaledSize * planetScaling, 32, 32]} scale={scaledSize * planetScaling} />

            <meshStandardMaterial map={texture}/>

            {children}

            {/* Atmospheric Glow Effect */}
            <mesh ref={atmosphereRef} position={[0, 0, 0]}  raycast={() => {}} material={fresnelMat}>
              <sphereGeometry raycast={() => {}} args={[(scaledSize * planetScaling) * 1.1, 32, 32]}/>
            </mesh>
            

            {hasClouds && <EarthCloud size={scaledSize * planetScaling * 1.02} />}

            {name == "Saturn" && <mesh raycast={() => {}} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              {/* Outer Ring */}
              <ringGeometry args={[((scaledSize * planetScaling) * 0.058) + (scaledSize * planetScaling), ((scaledSize * planetScaling) * 1.5) + (scaledSize * planetScaling), 128]} />
              <meshBasicMaterial map={ring_texture} transparent={true} opacity={1} side={THREE.DoubleSide}/>
            </mesh> }

            {/* Planetary Indicator Circle,\*/}
            <PlanetIndicator distanceThreshold={distanceThreshold} userControlsRef={userControlsRef} name={name} color={color}/>
            
          </mesh>
        </group>
        </>
    );
}

export default Planet;

