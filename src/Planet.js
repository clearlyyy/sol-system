import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { SphereGeometry, ShaderMaterial, DoubleSide, MeshStandardMaterial, Line, LineLoop, BufferGeometry, LineBasicMaterial, Vector3, Float32BufferAttribute } from "three";

const degToRad = (deg) => deg * (Math.PI / 180);

// Custom Shader for the Atmosphere
const atmosphereShader = {
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 atmosphereColor;
      uniform float intensity;
      uniform float scaleHeight;
      uniform vec3 sunDirection; // Direction of sunlight for scattering
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      // Constants for Rayleigh and Mie scattering
      const float RayleighConstant = 1.0;
      const float MieConstant = 0.003;
  
      // Function to calculate Rayleigh scattering
      float rayleighScattering(float cosTheta) {
        return RayleighConstant * pow(1.0 - cosTheta * cosTheta, 4.0);
      }
  
      // Function to calculate Mie scattering
      float mieScattering(float cosTheta) {
        return MieConstant * (1.0 - cosTheta * cosTheta);
      }
  
      void main() {
        // Light direction and view direction for scattering
        vec3 lightDir = normalize(sunDirection);
        vec3 viewDir = normalize(vPosition);
  
        // Calculate the angle between the normal (view) and the light source
        float cosTheta = dot(viewDir, lightDir);
  
        // Rayleigh and Mie scattering contributions
        float rayleigh = rayleighScattering(cosTheta);
        float mie = mieScattering(cosTheta);
  
        // Attenuation factor (based on the distance from the center)
        float distance = length(vPosition);
        float attenuation = exp(-distance / scaleHeight);
        
        // Final color calculation: combine the scattering contributions with attenuation
        vec3 glow = atmosphereColor * intensity * (rayleigh + mie) * attenuation;
  
        // Apply the final glow color with transparency (alpha channel set to a value for transparency)
        gl_FragColor = vec4(glow, glow.r + glow.g + glow.b); // Set alpha based on intensity of glow
      }
    `,
};

// Function to generate orbital path based on Keplerian elements
const generateOrbitalPath = (A, EC, i, omega, Omega, numPoints = 100) => {
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

  return points;
};


const scalingFactor = 1.495239195637494e7;  // Conversion from km to A



function Planet({
    textureUrl,
    size,
    rotationSpeed,
    orbitSpeed,
    tilt,
    orbitRadius,
    color,
    atmosphereColor = new THREE.Color(0xaaaaaa), // Default color for atmosphere
    atmosphereIntensity,
    A,
    EC,
    i,
    omega,
    Omega
}) {

    console.log(A / scalingFactor, EC, i, omega, Omega);
    const planetRef = useRef();
    const orbitRef = useRef();
    const atmosphereRef = useRef();

    // Load texture
    const texture = useLoader(TextureLoader, textureUrl);
    
    // Generate orbital path points (Keplerian orbit)
    const orbitalPathPoints = generateOrbitalPath(orbitRadius, 0.1); // Example values for A and EC

    useEffect(() => {
        console.log("Loaded texture: ", texture);
    }, [texture]);

    useEffect(() => {
        if (planetRef.current) {
            planetRef.current.rotation.z = degToRad(tilt || 0);
        }
    }, [tilt]);


    const orbitalPath = generateOrbitalPath(A / scalingFactor, EC, i, omega, Omega, 10000);
    let currentPointIndex = 0;
    let timeElapsed = 0;
    const planetOrbitSpeed = 5;  // Slow down to smooth out movement
    const pathLength = orbitalPath.length;
      
    useFrame(() => {
      if (planetRef.current) {
        // Rotate the planet around its own axis
        planetRef.current.rotation.y += rotationSpeed || 0.01;
      
        // Update the orbit reference (but ensure it doesn't rotate the orbit path itself)
        if (orbitRef.current) {
          orbitRef.current.rotation.y = 0;  // No rotation on the orbit reference
        }
      
        // Increase the timeElapsed to simulate continuous movement
        timeElapsed += planetOrbitSpeed;
      
        // Normalize timeElapsed to determine the segment along the orbit
        const pathProgress = timeElapsed % pathLength;
      
        // Use pathProgress to find the current point and next point
        const currentPoint = orbitalPath[Math.floor(pathProgress)];
        const nextPoint = orbitalPath[Math.floor(pathProgress) + 1] || orbitalPath[0];  // Wrap around if we reach the end
      
        // Calculate interpolation factor
        const segmentProgress = pathProgress - Math.floor(pathProgress);
      
        // Interpolate position between current and next points
        const x = THREE.MathUtils.lerp(currentPoint.x, nextPoint.x, segmentProgress);
        const y = THREE.MathUtils.lerp(currentPoint.y, nextPoint.y, segmentProgress);
        const z = THREE.MathUtils.lerp(currentPoint.z, nextPoint.z, segmentProgress);
      
        // Update planet's position
        planetRef.current.position.set(x, y, z);
      }
    });



    const atmosphereMaterial = new ShaderMaterial({
        vertexShader: atmosphereShader.vertexShader,
        fragmentShader: atmosphereShader.fragmentShader,
        uniforms: {
          atmosphereColor: { value: new THREE.Color(atmosphereColor) },
          intensity: { value: atmosphereIntensity || 2.0 },
          scaleHeight: { value: 5000 }, // Adjust scale height for atmospheric thickness
          sunDirection: { value: new THREE.Vector3(1, 1, 0).normalize() }, // Direction of the sun (adjust as needed)
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
    });

    



    const points = generateOrbitalPath(A / scalingFactor, EC, i, omega, Omega); // Generate points based on Keplerian data

    return (
        <group>
          {/* Orbit Path */}
          <lineLoop ref={orbitRef}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position" 
                    array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))} 
                    count={points.length} 
                    itemSize={3} 
                />
            </bufferGeometry>
            <lineBasicMaterial color={color} />
        </lineLoop>

          {/* Planet and atmosphere */}
          <mesh ref={planetRef} position={[orbitRadius, 0, 0]}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshBasicMaterial map={texture} />

            {/* Atmospheric Glow Effect */}
            <mesh ref={atmosphereRef} position={[0, 0, 0]}>
              <sphereGeometry args={[size * 1.1, 32, 32]} />
              <primitive object={atmosphereMaterial} attach="material" />
            </mesh>
          </mesh>
        </group>
    );
}

export default Planet;
