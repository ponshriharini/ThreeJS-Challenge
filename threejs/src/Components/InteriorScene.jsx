import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InteriorModel from "./InteriorModel";
import * as THREE from "three";

function InteriorScene({ cameraRef, listenerRef, handleDoorNear }) {
  return (
    <Canvas
      shadows
      camera={{ aspect: window.innerWidth / window.innerHeight }}
      onCreated={({ camera, gl, scene }) => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.setClearColor("#9B9B9B"); 
        scene.background = new THREE.Color("#9B9B9B"); 

        // Store the camera reference
        cameraRef.current = camera; 
        // Attach audio listener to the camera
        camera.add(listenerRef.current); 
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={1} />
  
      {/* Point Light */}
      <pointLight position={[0, 10, -2]} intensity={400} color={"white"} castShadow />

      {/* Spotlight for Focus */}
      <spotLight position={[15, 20, 5]} angle={0.3} intensity={1.2} color={"white"} castShadow />

      <InteriorModel onDoorNear={handleDoorNear} />

      {/* Orbit Controls with camera movement limit */}
      <OrbitControls minDistance={5} maxDistance={21} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}

export default InteriorScene;
