import React, { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import FakeGlowMaterial from "../Shaders/FakeGlowMaterial";
import { scalingFactor, planetScaling, sunScaling } from "../App"

function Sun({size}) {
  const lightRef = useRef();
  const meshRef = useRef();
  const sunRef = useRef();

  const [scaledSize, setScaledSize] = useState(size * (planetScaling / sunScaling) / scalingFactor);
  
  useEffect(() => {
    setScaledSize(size * (planetScaling / sunScaling) / scalingFactor);
    meshRef.current.userData = {
      size
    }
  },[size])

  return (
    <group ref={sunRef} raycast={()=>{}}>
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
      <mesh ref={meshRef} position={[0, 0, 0]} name="Sun">
        <sphereGeometry args={[scaledSize, 32, 32]} />
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={2.0} // Increased emissive intensity
        />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]} name="Sun">
        <sphereGeometry args={[scaledSize * 1.5, 32, 32]} />
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
