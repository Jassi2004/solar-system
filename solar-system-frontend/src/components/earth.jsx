import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/earth.glb");

function EarthModel() {
  const model = useGLTF("/model/earth.glb");
  const earthRef = useRef(); // Ref for Earth's position

  useFrame(({ clock }) => {
    if (!earthRef.current) return;

    const t = clock.getElapsedTime() * 0.9; // Adjust speed
    const radius = 25; // Larger orbit radius

    // ✅ Set orbit center to (-65, 0, 0)
    const centerX = -45;
    const centerZ = 0;

    earthRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    earthRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={earthRef}
      object={model.scene}
      scale={[1, 1, 1]}
      position={[-65, 2, 0]} // Ensure correct starting position
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

// Main Earth component
function Earth() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EarthModel />
    </Suspense>
  );
}

export default Earth;
