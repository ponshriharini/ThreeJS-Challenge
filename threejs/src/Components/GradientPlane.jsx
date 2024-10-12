import React from "react";
import * as THREE from "three";

function GradientPlane() {
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("#f6a0ff") }, // Starting color (deep pink/purple)
        color2: { value: new THREE.Color("#7dd2d5") }, // Middle color (dark cyan/blue)
        color3: { value: new THREE.Color("#f6a0ff") }  // Ending color (deep pink/purple)
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        void main() {
          vec3 gradientColor;
          if (vUv.y < 0.5) {
            gradientColor = mix(color1, color2, vUv.y * 2.0); // From color1 to color2 in the lower half
          } else {
            gradientColor = mix(color2, color3, (vUv.y - 0.5) * 2.0); // From color2 to color3 in the upper half
          }
          gl_FragColor = vec4(gradientColor, 1.0);
        }
      `,
    });
  
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
    );
}

export default GradientPlane;