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
  
  


function Planet({
    textureUrl,
    size,
    rotationSpeed,
    orbitSpeed,
    tilt,
    orbitRadius,
    color,
    atmosphereColor = new THREE.Color(0xaaaaaa), // Default color for atmosphere
    atmosphereIntensity
}) {
    const planetRef = useRef();
    const orbitRef = useRef();
    const atmosphereRef = useRef();

    // Load texture and log it to ensure it's loaded properly
    const texture = useLoader(TextureLoader, textureUrl);
    
    const debugXRef = useRef();
    const debugYRef = useRef();
    const debugZRef = useRef();

    useEffect(() => {
        console.log("Loaded texture: ", texture); // Check if texture is loaded
    }, [texture]);

    useEffect(() => {
        if (planetRef.current) {
            planetRef.current.rotation.z = degToRad(tilt || 0);  // Apply the tilt only once
        }
    }, [tilt]);

    useEffect(() => {
        // Create the debug lines (X, Y, Z axes) with longer lengths
        const materialX = new LineBasicMaterial({ color: 0xff0000 }); // Red for X-axis
        const geometryX = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(2, 0, 0)]); // Longer X axis line
        const debugLineX = new Line(geometryX, materialX);
        debugXRef.current = debugLineX;

        const materialY = new LineBasicMaterial({ color: 0x00ff00 }); // Green for Y-axis
        const geometryY = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 2, 0)]); // Longer Y axis line
        const debugLineY = new Line(geometryY, materialY);
        debugYRef.current = debugLineY;

        const materialZ = new LineBasicMaterial({ color: 0x0000ff }); // Blue for Z-axis
        const geometryZ = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, 2)]); // Longer Z axis line
        const debugLineZ = new Line(geometryZ, materialZ);
        debugZRef.current = debugLineZ;

        console.log("Debug lines created");

        // Manually adding the debug lines to the scene
        if (planetRef.current) {
            planetRef.current.add(debugXRef.current);
            planetRef.current.add(debugYRef.current);
            planetRef.current.add(debugZRef.current);
        }

    }, []);

    // Create the orbital path
    useEffect(() => {
        const points = [];
        const numPoints = 100;
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            points.push(new Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
        }

        const geometry = new BufferGeometry().setFromPoints(points);
        const material = new LineBasicMaterial({ color: color, opacity: 0.5, transparent: true });
        const orbitPath = new LineLoop(geometry, material);

        // Add the orbit path to the scene (should be centered around the origin, not the planet)
        if (planetRef.current) {
            planetRef.current.parent.add(orbitPath);  // Add the orbit path to the parent group of the planet
        }
    }, [orbitRadius]);

    // Use useFrame to animate the planet rotation and orbit
    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.y += rotationSpeed || 0.01;  // Rotate around its own axis

            if (orbitRef.current) {
                orbitRef.current.rotation.y += orbitSpeed || 0.005;  // Orbit around the Sun
            }
        }
    });

    // Use useFrame to animate the planet rotation
    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.y += rotationSpeed || 0.01; // Rotate around Y-axis
        }

        if (orbitRef.current) {
            orbitRef.current.rotation.y += orbitSpeed || 0.005; // Orbit around the Sun
        }

        if (planetRef.current) {
            // Update the rotation of the debug lines
            debugXRef.current.rotation.y = planetRef.current.rotation.y;
            debugYRef.current.rotation.y = planetRef.current.rotation.y;
            debugZRef.current.rotation.y = planetRef.current.rotation.y;
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
        transparent: true, // Enable transparency
        blending: THREE.AdditiveBlending, // Use additive blending for glowing effect
        depthWrite: false, // Disable depth writing so that the atmosphere doesn't block the planet
        side: THREE.DoubleSide, // Show both sides of the atmosphere
      });
      
      
      
      
      
    
      return (
        <group>
          {/* Orbit Path (optional) */}
          <mesh ref={planetRef} position={[orbitRadius, 0, 0]}>
            {/* Planet Sphere */}
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
