import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei"; // Use useGLTF from drei
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useKeyboardControls from "./hooks/useKeyboardControls";

function InteriorModel({ onDoorNear }) {
  const { camera } = useThree();
  const keys = useKeyboardControls();
  const doorRef = useRef();
  const gltf = useGLTF("/Models/PresidioMartInterior.glb"); // Load the GLTF model using useGLTF

  // Define the boundaries for the interior (adjust these values according to your model)
  const boundaryMin = new THREE.Vector3(-7, 1, -10); // Min boundary (walls/floor limits)
  const boundaryMax = new THREE.Vector3(5, 5, 7);  // Max boundary (walls/ceiling limits)

  useEffect(() => {
      // Assuming the door in the interior model is named "DoorInterior"
      const door = gltf.scene.getObjectByName("Door");
      if (door) {
        doorRef.current = door;

        // Set the camera at a specific position when the interior model is loaded
        camera.position.set(100, 800, -300); // Example position (x, y, z) - Adjust as needed
      }
    }, [camera]);

  // Movement and proximity checks
  useFrame(() => {
    const direction = new THREE.Vector3(); // Forward direction to move the camera
    const rightVector = new THREE.Vector3(); // Right vector for strafing

    // Get camera's forward and right vectors
    camera.getWorldDirection(direction); 
    rightVector.crossVectors(camera.up, direction); // Create the right vector for strafing

    // Apply camera movement based on key input with a fixed step
    const stepDistance = 0.05;
    if (keys.current.forward) {
      camera.position.addScaledVector(direction, stepDistance); // Move forward
    }
    if (keys.current.backward) {
      camera.position.addScaledVector(direction, -stepDistance); // Move backward
    }
    if (keys.current.left) {
      camera.position.addScaledVector(rightVector, -stepDistance); // Strafe left
    }
    if (keys.current.right) {
      camera.position.addScaledVector(rightVector, stepDistance); // Strafe right
    }
    if (keys.current.up) {
      camera.position.y += stepDistance; // Move up
    }

    // Ensure camera remains within boundaries
    camera.position.x = Math.max(boundaryMin.x, Math.min(boundaryMax.x, camera.position.x));
    camera.position.y = Math.max(boundaryMin.y, Math.min(boundaryMax.y, camera.position.y));
    camera.position.z = Math.max(boundaryMin.z, Math.min(boundaryMax.z, camera.position.z));

    // Check proximity to the door to return to exterior
    if (gltf.scene) {
      const door = gltf.scene.getObjectByName("Door");
      if (door) {
        const doorPosition = new THREE.Vector3();
        door.getWorldPosition(doorPosition);

        const distance = camera.position.distanceTo(doorPosition);
        if (distance < 2.5) {
          onDoorNear(); // Switch back to the exterior
        }
      }
    }
  });

  return gltf ? <primitive object={gltf.scene} /> : null;
}

export default InteriorModel;
