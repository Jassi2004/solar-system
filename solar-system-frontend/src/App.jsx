import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import Earth from "./components/Earth";
import ThreeDErrorBoundary from "./components/ThreeDErrorBoundary";
import LightHelpers from "./components/LightHelpers";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function SunLight() {
  const lightRef = useRef(null);

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}  // Position relative to Sun's position
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
    <Canvas  style={{ width: "100vw", height: "100vh", background: "black" }} camera={{ position: [0, 25, 40], fov: 45 }}>
      <ThreeDErrorBoundary>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.1} />
        
        {/* Sun System Group - Positioned on the left */}
        <group position={[-15, 0, 0]}>
          <Sun />
          <SunLight />
        </group>

        

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