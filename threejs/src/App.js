import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import GradientPlane from "./Components/GradientPlane";

function ExteriorModel() {
  const [gltf, setGltf] = useState(null);

  // Load the GLB model using GLTFLoader
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/Models/PresidioMartExterior.glb", (gltfData) => {
      setGltf(gltfData);
    });
  }, []);

  return gltf ? <primitive object={gltf.scene} /> : null;
}

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [1500, 300, -80], fov: 90, aspect: window.innerWidth / window.innerHeight }}
      onCreated={({ gl, scene }) => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.setClearColor(new THREE.Color("#0d0d0d")); // Set background to dark
        scene.background = new THREE.Color("#3E0D40"); // Matching the gradient background
      }}
    >
      
      {/* Ambient Light */}
      <ambientLight intensity={1} />
      
      {/* Point Lights for Neon Glow Effect */}
      {/* Neon pink light */}
      <pointLight position={[10, 25, 10]} intensity={1.2} color={"#DE23DC"} castShadow /> 
      {/* Neon cyan light */}
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
      
      {/* Exterior Model */}
      <ExteriorModel />
      
      {/* Gradient-colored ground plane */}
      <GradientPlane />
      
      {/* Orbit Controls with camera movement limit */}
      <OrbitControls
        minDistance={5}
        maxDistance={21} // Increase maxDistance to allow zooming out further
        maxPolarAngle={Math.PI / 2.1} // Prevents camera from going below the plane
      />
    </Canvas>
  );
}

export default App;
