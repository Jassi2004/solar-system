import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import Earth from "./components/Earth";
import ThreeDErrorBoundary from "./components/ThreeDErrorBoundary";
import LightHelpers from "./components/LightHelpers";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Venus from "./components/Venus";
import Mars from "./components/mars";
import Jupiter from "./components/jupiter";
import Saturn from "./components/Saturn";
import Uranus from "./components/Uranus";
import Neptune from "./components/Neptune";

function SunLight() {
  const lightRef = useRef(null);

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]} // Position relative to Sun's position
        intensity={5}
        distance={50}
        decay={2}
        color={new THREE.Color("#ffcc99")}
      />
      <LightHelpers lightRef={lightRef} />
    </group>
  );
}

export default function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "white" }}
      camera={{ position: [0, 25, 40], fov: 45 }}
    >
      <ThreeDErrorBoundary>
        <color attach="background" args={["#fff"]} />

        {/* Ambient Light to fill the whole scene */}
        <ambientLight intensity={0.8} />

        {/* Add a Directional Light to simulate sunlight */}
        <directionalLight
          position={[10, 10, 10]} // Adjust position to create realistic lighting
          intensity={1.5} // Control light intensity
          color={new THREE.Color("#ffffff")} // White sunlight
          castShadow // Enable shadows (if needed)
        />

        {/* Sun System Group - Positioned on the left */}
        <group position={[-15, 0, 0]}>
          <Sun />
          <SunLight />
        </group>

        {/* Mercury positioned to the right */}
        <group position={[5, 0, 0]}>
          <Mercury />
          <Venus />
          <Earth />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
        </group>

        {/* Effect Composer for post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </ThreeDErrorBoundary>
    </Canvas>
  );
}
