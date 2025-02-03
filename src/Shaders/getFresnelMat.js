import * as THREE from "three";

function getFresnelMat(
    rimHex, 
    facingHex = 0x000000, 
    fresnelStart = 0.001,
    fresnelEnd =  0.5    
) {
    const uniforms = {
        color1: { value: new THREE.Color(rimHex) },
        color2: { value: new THREE.Color(facingHex) },
        fresnelBias: { value: 0.01 },
        fresnelScale: { value: 7 },
        fresnelPower: { value: 2.1 },
        glowIntensity: { value: 0.1 },
        fresnelStart: { value: fresnelStart },
        fresnelEnd: { value: fresnelEnd }
    };

    const vs = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;
    varying vec3 vWorldPosition;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
        vec3 I = normalize(worldPosition.xyz - cameraPosition);

        float fresnel = 1.0 - dot(I, worldNormal);
        fresnel = fresnelBias + fresnelScale * pow(1.0 - fresnel, fresnelPower);

        vReflectionFactor = clamp(fresnel, 0.0, 1.0);
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * mvPosition;
    }
    `;

    const fs = `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float glowIntensity;
    uniform float fresnelStart;
    uniform float fresnelEnd;

    varying float vReflectionFactor;
    varying vec3 vWorldPosition;

    void main() {
        float distanceToCamera = length(vWorldPosition - cameraPosition);

        // Smoothly fade fresnel effect between the start and end distances
        float fresnelEffect = smoothstep(fresnelStart, fresnelEnd, distanceToCamera) * vReflectionFactor;

        // Apply glow and color mix
        float glow = exp(-3.0 * fresnelEffect) * glowIntensity;
        vec3 mixedColor = mix(color2, color1, fresnelEffect + glow * 0.5);

        // Final transparency control
        float alpha = fresnelEffect * exp(-2.5 * (1.0 - fresnelEffect));

        gl_FragColor = vec4(mixedColor, alpha);
    }
    `;

    const fresnelMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

    return fresnelMat;
}

export { getFresnelMat };
