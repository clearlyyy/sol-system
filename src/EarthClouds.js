import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EarthCloud(size) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    // Create the destination canvas
    const canvasResult = document.createElement('canvas');
    canvasResult.width = 1024;
    canvasResult.height = 512;
    const contextResult = canvasResult.getContext('2d');

    // Load earthcloudmap
    const imageMap = new Image();
    imageMap.addEventListener("load", function () {
      const canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

      // Load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener("load", function () {
        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);

        // Merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
          }
        }

        // Update the texture with result
        contextResult.putImageData(dataResult, 0, 0);
        const texture = new THREE.Texture(canvasResult);
        texture.needsUpdate = true;

        // Set the texture in state
        setTexture(texture);
      });
      imageTrans.src = '/images/earthcloudmaptrans.jpg';  // Provide path for your texture
    }, false);
    imageMap.src = '/images/earthcloudmap.jpg';  // Provide path for your texture

  }, []);

  // If the texture is not loaded, return null or a loading spinner
  if (!texture) return null;

  return (
    <mesh raycast={() => {}} ref={meshRef}>
      <sphereGeometry args={[size.size, 32, 32]} />
      <meshPhongMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default EarthCloud;
