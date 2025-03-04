import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/mars.glb");

function MarsModel() {
  const model = useGLTF("/model/mars.glb");
  const marsRef = useRef(); // Ref for Mars's position

  useFrame(({ clock }) => {
    if (!marsRef.current) return;

    const t = clock.getElapsedTime() * 0.9; // Adjust speed
    const radius = 25; // Larger orbit radius

    // ✅ Set orbit center to (-75, 0, 0)
    const centerX = -35;
    const centerZ = 0;

    marsRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    marsRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={marsRef}
      object={model.scene}
      scale={[1.2, 1.2, 1.2]}
      position={[-75, 3, 0]} // Ensure correct starting position
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

// Main Mars component
function Mars() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MarsModel />
    </Suspense>
  );
}

export default Mars;
