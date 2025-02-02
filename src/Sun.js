import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import FakeGlowMaterial from "./FakeGlowMaterial";
function Sun() {
  const lightRef = useRef();
  const meshRef = useRef();
  const sunRef = useRef();

  return (
    <group ref={sunRef}>
      {/* Point Light - Sun's light source */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={3}
        distance={20000}
        decay={0}
        color={0xffffff}
        castShadow={true}
      />

      {/* Sun's glowing sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={2.0} // Increased emissive intensity
        />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={2.0} // Increased emissive intensity
        />
        <FakeGlowMaterial falloff = {0.01}
          glowInternalRadius = {4.0}
          glowColor = {'yellow'}
          glowSharpness = {0.5}
          side = {'THREE.FrontSide'}
          depthTest = {true}
          depthWrite = {false}
          opacity = {2.0} />
      </mesh>
    </group>
  );
}

export default Sun;
