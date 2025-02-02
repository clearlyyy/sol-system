import * as THREE from 'three';

/**
 * Generates an atmosphere material with an edge fade effect.
 * @return {THREE.ShaderMaterial} The custom atmosphere material.
 */
function generateAtmosphereMaterial() {
  var vertexShader = [
    'varying vec3 vVertexWorldPosition;',
    'varying vec3 vVertexNormal;',
    
    'void main(){',
    '  vVertexNormal = normalize(normalMatrix * normal);',
    '  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}',
  ].join('\n');

  var fragmentShader = [
    'uniform vec3 glowColor;',
    'uniform float coeficient;',
    'uniform float power;',
    'uniform float edgeFadeStart;',
    'uniform float edgeFadeEnd;',
    
    'varying vec3 vVertexNormal;',
    'varying vec3 vVertexWorldPosition;',
    
    'void main(){',
    // Calculate the camera-to-vertex distance
    '  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;',
    '  vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    '  viewCameraToVertex = normalize(viewCameraToVertex);',
    
    // Calculate the intensity of the glow based on the normal and view direction
    '  float intensity = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
    
    // Calculate the distance of the fragment from the center of the object (radius-based fade)
    '  float distanceFromCenter = length(vVertexWorldPosition);',
    
    // Add a smooth edge fade effect based on distance from center
    '  float edgeFade = smoothstep(edgeFadeStart, edgeFadeEnd, distanceFromCenter);',
    
    // Apply the edge fade effect to the glow intensity
    '  intensity *= edgeFade;',
    
    // Final color with the calculated intensity
    '  gl_FragColor = vec4(glowColor, intensity);',
    '}',
  ].join('\n');

  // Create the custom material using the shader code
  var material = new THREE.ShaderMaterial({
    uniforms: {
      coeficient: {
        type: "f",
        value: 1.0,
      },
      power: {
        type: "f",
        value: 2.0,
      },
      glowColor: {
        type: "c",
        value: new THREE.Color('0x00b3ff'),
      },
      edgeFadeStart: {
        type: "f",
        value: 1.0, // Start of the fade effect, closer to the center
      },
      edgeFadeEnd: {
        type: "f",
        value: 1.2, // End of the fade effect, further from the center
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  return material;
}

export default generateAtmosphereMaterial;
