import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import Earth from "./components/Earth";
import Venus from "./components/Venus";
import Mars from "./components/Mars";
import Jupiter from "./components/Jupiter";
import Saturn from "./components/Saturn";
import Uranus from "./components/Uranus";
import Neptune from "./components/Neptune";
import ThreeDErrorBoundary from "./components/ThreeDErrorBoundary";
import LightHelpers from "./components/LightHelpers";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ✅ Fix: SunLight component with a proper ref check
function SunLight() {
  const lightRef = useRef();

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]} // Positioned at the sun's center
        intensity={5}
        distance={50}
        decay={2}
        color={new THREE.Color("#ffcc99")}
      />
      {/* ✅ Safe check before rendering LightHelpers */}
      {lightRef.current && lightRef.current.parent && (
        <LightHelpers lightRef={lightRef} />
      )}
    </group>
  );
}

// ✅ Background component with error handling
// function Background() {
//   const texture = useTexture("");
//   const { scene } = useThree();

//   useEffect(() => {
//     if (texture) {
//       scene.background = texture;
//     }
//   }, [texture, scene]);

//   return null; // No need to render anything
// }

function SafeGLTF({ path }) {
  const { scene } = useGLTF(path, "/draco/");
  return <primitive object={scene} />;
}

// ✅ App Component
export default function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", backgroundColor: "#A9A9A9" }}
      camera={{ position: [0, 25, 40], fov: 45 }}
    >
      <ThreeDErrorBoundary>
        <color attach="background" args={["#000"]} />

        {/* Scene Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color={new THREE.Color("#ffffff")}
          castShadow
        />

        {/* Sun and Sunlight */}
        <group position={[-15, 0, 0]}>
          <Sun />
          <SunLight />
        </group>

        {/* Planets */}
        <group position={[5, 0, 0]}>
          {/* <Mercury /> */}
          <Venus />
          <Earth />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
        </group>

        {/* Background */}
        {/* <Background /> */}

        {/* Post-processing effects */}
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
