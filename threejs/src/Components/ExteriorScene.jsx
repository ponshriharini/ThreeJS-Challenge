import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ExteriorModel from "./ExteriorModel";
import GradientPlane from "./GradientPlane";
import * as THREE from "three";

function ExteriorScene({ cameraRef, listenerRef, handleDoorNear }) {
  return (
    <Canvas
      shadows
      camera={{ position: [1300, 300, 0], fov: 70, aspect: window.innerWidth / window.innerHeight }}
      onCreated={({ camera, gl, scene }) => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.setClearColor("#0d0d0d"); 
        scene.background = new THREE.Color("#3E0D40"); 

        cameraRef.current = camera;
        camera.add(listenerRef.current); 
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={1} />

      {/* Point Lights for Neon Glow Effect */}
      <pointLight position={[10, 25, 10]} intensity={1.2} color={"#DE23DC"} castShadow />
      <pointLight position={[-10, -10, 10]} intensity={1.2} color={"#00ffff"} castShadow />

      {/* Sign Light */}
      <pointLight position={[0, 10, -2]} intensity={400} color={"red"} castShadow />

      {/* Exterior Lights */}
      <pointLight position={[0, 10, 10]} intensity={1000} color={"purple"} castShadow />
      <pointLight position={[0, 10, -10]} intensity={1000} color={"purple"} castShadow />

      {/* Welcome sign light */}
      <pointLight position={[20, 5, -1]} intensity={180} color={"blue"} castShadow />

      {/* Spotlight for Focus */}
      <spotLight position={[15, 20, 5]} angle={0.3} intensity={1.2} color={"#ffff00"} castShadow />

      <ExteriorModel onDoorNear={handleDoorNear} />

      <GradientPlane />

      {/* Orbit Controls with camera movement limit */}
      <OrbitControls minDistance={5} maxDistance={21} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}

export default ExteriorScene;
