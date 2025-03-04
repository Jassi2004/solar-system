import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/jupiter.glb");

function JupiterModel() {
  const model = useGLTF("/model/jupiter.glb");
  const jupiterRef = useRef(); // Ref for Jupiter's position

  useFrame(({ clock }) => {
    if (!jupiterRef.current) return;

    const t = clock.getElapsedTime() * 0.6; // Adjust speed
    const radius = 30; // Larger orbit radius

    // ✅ Set orbit center to (-90, 0, 0)
    const centerX = -30;
    const centerZ = 0;

    jupiterRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    jupiterRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={jupiterRef}
      object={model.scene}
      scale={[0.03, 0.03, 0.03]}
      position={[-90, 0, 0]} // Ensure correct starting position
      rotation={[0, 0, 0]}
      dispose={null}
    />
  );
}

// Fallback component while loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

// Main Jupiter component
function Jupiter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <JupiterModel />
    </Suspense>
  );
}

export default Jupiter;
