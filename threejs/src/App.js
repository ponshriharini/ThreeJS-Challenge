import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import InteriorScene from "./Components/InteriorScene";
import ExteriorScene from "./Components/ExteriorScene";
import LoadingImage from "./Components/LoadingImage.jsx"; 
import { useGLTF } from "@react-three/drei";

function App() {
  const [inside, setInside] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); 
  const [loading, setLoading] = useState(false); 

  // Camera reference to attach audio listener
  const cameraRef = useRef(); 
  const listenerRef = useRef(new THREE.AudioListener());

  const exteriorSoundRef = useRef(null); 
  const interiorSoundRef = useRef(null); 

  useGLTF.preload("/Models/PresidioMartInterior.glb");

  // Effect to attach listener to the camera
  useEffect(() => {
    const listener = listenerRef.current;
    if (cameraRef.current) {
      cameraRef.current.add(listener);
    }
  }, [cameraRef]);

  // Handle user interaction to start playing sound
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Effect to manage switching between sounds based on `inside` state
  useEffect(() => {
    if (userInteracted) {
      const audioLoader = new THREE.AudioLoader();

      if (inside) {
        // Handle entering interior
        if (exteriorSoundRef.current && exteriorSoundRef.current.isPlaying) {
          exteriorSoundRef.current.stop(); 
        }

        // Load interior sound
        if (!interiorSoundRef.current) {
          const interiorSound = new THREE.Audio(listenerRef.current);
          audioLoader.load("/Assets/Interior.mp4", function (buffer) {
            interiorSound.setBuffer(buffer);
            interiorSound.setLoop(true);
            interiorSound.setVolume(0.5);
            interiorSound.play();
            interiorSoundRef.current = interiorSound; // Save reference
          });
        } else if (!interiorSoundRef.current.isPlaying) {
          interiorSoundRef.current.play(); // Play again if stopped
        }

      } else {
        // Handle entering exterior
        if (interiorSoundRef.current && interiorSoundRef.current.isPlaying) {
          interiorSoundRef.current.stop(); 
        }

        // Load exterior sound
        if (!exteriorSoundRef.current) {
          const exteriorSound = new THREE.Audio(listenerRef.current);
          audioLoader.load("/Assets/Exterior.mp4", function (buffer) {
            exteriorSound.setBuffer(buffer);
            exteriorSound.setLoop(true);
            exteriorSound.setVolume(0.5);
            exteriorSound.play();
            exteriorSoundRef.current = exteriorSound; 
          });
        } else if (!exteriorSoundRef.current.isPlaying) {
          exteriorSoundRef.current.play();
        }
      }
    }
  }, [inside, userInteracted]);

  // Function to toggle between inside and outside with loading
  const handleDoorNear = () => {
    setLoading(true); 
    setTimeout(() => {
      setInside((prevState) => !prevState); // Toggle the inside state after delay
      setLoading(false); 
    }, 3000); 
  };

  return (
    <>
      {loading && <LoadingImage />
      } 
      {!loading && (
        <>
          {inside ? (
            <InteriorScene
              cameraRef={cameraRef}
              listenerRef={listenerRef}
              handleDoorNear={handleDoorNear}
            />
          ) : (
            <ExteriorScene
              cameraRef={cameraRef}
              listenerRef={listenerRef}
              handleDoorNear={handleDoorNear}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
