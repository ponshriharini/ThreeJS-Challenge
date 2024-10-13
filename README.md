# 🎯 3D Product Modelling Challenge 🎯

## Project Overview

This project is an **interactive 3D experience** of a **Physical Store (brick and mortar)**. It allows users to explore the store's exterior and interior with features such as 360-degree rotation, zoom, and texture mapping. Users can transition between the exterior and interior environments, with unique sound effects for each scene.

The primary goal is to create a **web-based interactive 3D model** using **Three.js**, where users can navigate the store, with **mouse/touch controls** for rotation, zooming, and interaction.

### Challenge Requirements:
- **3D Model**: Create an interactive 3D model of a physical store (interior and exterior).
- **Interactions**: 360-degree rotation, zoom, and texture mapping using mouse/touch controls.
- **Deliverable**: A web page showcasing the interactive 3D model using libraries like **Three.js**.

## Features

### 1. **Exterior Model**:
- Users can rotate, zoom in, and zoom out to explore the store’s exterior.
- **Background Music**: Starts playing when the user interacts with the scene (mouse click/keyboard press).
- Zooming in close to the door transitions the user into the interior of the store.

### 2. **Interior Model**:
- Users can move inside the store using the **arrow keys** (up, down, left, right) and **mouse**.
- Zoom in and out using the mouse.
- **Spacebar**: Moves the camera upwards.
- **Background Music**: A different sound plays inside the store.
  
### 3. **Dynamic Transitions**:
- When the user zooms into the door, the interior model and sound are dynamically loaded.
- Moving near the door in the interior transitions back to the exterior scene.

## Technologies Used

- **Blender**: For creating 3D models
- **Three.js**: For rendering and animating the 3D models.
- **React Three Fiber**: A React renderer for Three.js.
- **@react-three/drei**: A set of helpers for working with Three.js and React Three Fiber.
- **GLTFLoader**: Used to load `.glb` models for both the exterior and interior of the store.
- **THREE.Audio**: Used to play background music in both scenes.
- **React Hooks**: For managing state and user interactions.

## Project Structure
```
public/
│
├── Assets/
│   ├── Exterior.mp4             # Background music for the exterior scene
│   ├── Interior.mp4             # Background music for the interior scene
│   └── loading.webp             # Image for the loading screen
│
│── Models/
│   ├── PresidioMartInterior.glb # Compressed GLB model for the interior of the store
│   └── PresidioMartExterior.glb # Compressed GLB model for the exterior of the store
│
src/
│
├── Components/
│   ├── ExteriorModel.jsx        # Loads the exterior 3D model and interactions
│   ├── ExteriorScene.jsx        # Manages the exterior scene (camera, lights, sounds)
│   ├── InteriorModel.jsx        # Loads the interior 3D model and handles movement
│   ├── InteriorScene.jsx        # Manages the interior scene (camera, lights, sounds)
│   ├── GradientPlane.jsx        # Adds a gradient background to the scene
│   └── LoadingImage.jsx         # Displays a loading animation during transitions
│
└── Hooks/
    └── useKeyboardControls.js   # Custom hook for keyboard movement controls (arrow keys)
```

## User Instructions

### 1. **Exterior Scene**:
- **Rotate**: Use the **mouse** to rotate around the store's exterior.
- **Zoom**: Scroll to zoom in or out.
- **Music**: Music plays after interacting with the scene (click or press any key).
- **Enter the Store**: Zoom in towards the door to transition to the interior.

### 2. **Interior Scene**:
- **Move**: Use the **arrow keys** or **mouse** to move around inside the store.
- **Zoom**: Use the scroll wheel to zoom in and out.
- **Camera Up**: Press the **spacebar** to move the camera upwards.
- **Exit the Store**: Move towards the door to return to the exterior scene.

## How It Works

- **Preloading**: The interior model is preloaded in the background while the user interacts with the exterior, ensuring a seamless transition when entering the store.
- **Dynamic Audio**: Different background music plays in the exterior and interior environments.
- **Efficient Rendering**: The 3D models are compressed using Draco compression, which reduces the file size and load time.

## Hosting

The project is hosted on **Amazon S3** and served via **Amazon CloudFront** for optimal performance and low latency.

### Hosted Link: [https://d2mhvbmvzqs8m2.cloudfront.net/index.html](https://d2mhvbmvzqs8m2.cloudfront.net/index.html)

## Running the Project Locally

### 1. Clone this repository:
```
git clone https://github.com/ponshriharini/ThreeJS-Challenge.git
cd threejs
```

### 2. Install dependencies:
``` 
npm install
```

### 3. Run the development server:
``` 
npm start 
```

### 4. Open your browser and visit:
```
http://localhost:3000
```