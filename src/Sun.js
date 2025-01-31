import React from "react";

function Sun() {
  return (
    <>
      {/* Point Light - Sun's light source */}
      <pointLight
        position={[0, 0, 0]}
        intensity={44}
        distance={200}
        decay={1}
        color={0xFFFFFF}
        castShadow={true}
      />

      {/* Sun's glowing sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        {/* Using meshStandardMaterial for better light interaction */}
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={0.8} // Increased emissive intensity
        />
      </mesh>
    </>
  );
}

export default Sun;
