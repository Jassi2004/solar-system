import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/neptune.glb");

function NeptuneModel() {
  const model = useGLTF("/model/neptune.glb");
  const neptuneRef = useRef(); // Ref for Neptune's position

  useFrame(({ clock }) => {
    if (!neptuneRef.current) return;

    const t = clock.getElapsedTime() * 1; // Adjust speed
    const radius = 60; // Larger orbit radius

    // ✅ Set orbit center to (-150, 0, 0)
    const centerX = -35;
    const centerZ = 0;

    neptuneRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    neptuneRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={neptuneRef}
      object={model.scene}
      scale={[0.25, 0.25, 0.25]}
      position={[-150, 6, 0]} // Ensure correct starting position
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

// Main Neptune component
function Neptune() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NeptuneModel />
    </Suspense>
  );
}

export default Neptune;
