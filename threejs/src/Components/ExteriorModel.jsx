import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function ExteriorModel({ onDoorNear }) {
    const [gltf, setGltf] = useState(null);
    const doorRef = useRef();
  
    useEffect(() => {
      const loader = new GLTFLoader();
      loader.load("/Models/PresidioMartExterior.glb", (gltfData) => {
        setGltf(gltfData);

        const door = gltfData.scene.getObjectByName("Door");
        if (door) {
            doorRef.current = door;
        }
      });
    }, []);

    // Hook to check camera proximity to the door every frame
    useFrame(({ camera }) => {
        if (doorRef.current) {
        const doorPosition = new THREE.Vector3();
        doorRef.current.getWorldPosition(doorPosition);

        const distance = camera.position.distanceTo(doorPosition);
        if (distance < 5) {
            onDoorNear(); // Trigger the switch to interior when close to the door
        }
        }
    });
  
    return gltf ? <primitive object={gltf.scene} /> : null;
}

export default ExteriorModel;