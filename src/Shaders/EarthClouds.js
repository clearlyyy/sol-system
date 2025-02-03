import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function EarthCloud({ size }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);  // New state to track texture loading

  useEffect(() => {
    console.log('useEffect running');

    const imageMap = new Image();
    const imageTrans = new Image();

    // Load earthcloudmap
    imageMap.src = '/earthcloudmap.jpg';
    imageMap.onload = () => {
      console.log('earthcloudmap.jpg loaded');
    };
    imageMap.onerror = (err) => {
      console.error('Failed to load earthcloudmap.jpg', err);
    };

    // Load earthcloudmaptrans
    imageTrans.src = '/earthcloudmaptrans.jpg';
    imageTrans.onload = () => {
      console.log('earthcloudmaptrans.jpg loaded');
    };
    imageTrans.onerror = (err) => {
      console.error('Failed to load earthcloudmaptrans.jpg', err);
    };

    // Once both images are loaded, combine them into a texture
    const handleImagesLoaded = () => {
      if (imageMap.complete && imageTrans.complete) {
        console.log('Both images loaded, combining textures');

        const canvasResult = document.createElement('canvas');
        canvasResult.width = imageMap.width;
        canvasResult.height = imageMap.height;
        const contextResult = canvasResult.getContext('2d');
        
        // Draw the first image on canvasResult
        contextResult.drawImage(imageMap, 0, 0);
        const dataMap = contextResult.getImageData(0, 0, canvasResult.width, canvasResult.height);

        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        
        // Draw the second image on canvasTrans
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);

        // Merge both images into the final result
        const dataResult = contextResult.createImageData(canvasResult.width, canvasResult.height);
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
          }
        }

        contextResult.putImageData(dataResult, 0, 0);
        const combinedTexture = new THREE.Texture(canvasResult);
        combinedTexture.needsUpdate = true;

        console.log('Texture set');
        setTexture(combinedTexture);  // Set the texture in the state
        setIsTextureLoaded(true);  // Mark texture as loaded
      }
    };

    imageMap.onload = handleImagesLoaded;
    imageTrans.onload = handleImagesLoaded;

  }, []);  // Empty dependency array means this effect only runs once

  useEffect(() => {
    if (isTextureLoaded) {
      console.log('Texture is set and re-rendering');
    }
  }, [isTextureLoaded]);  // This will trigger whenever the texture is updated

  if (!isTextureLoaded) {
    console.log('Waiting for texture to load...');

  }

  return (
    <mesh raycast={() => {}} ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial
        map={texture } 
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default EarthCloud;
