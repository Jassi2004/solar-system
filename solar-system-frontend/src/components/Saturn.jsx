import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/saturn.glb");

function SaturnModel() {
  const model = useGLTF("/model/saturn.glb");
  const saturnRef = useRef(); // Ref for Saturn's position

  useFrame(({ clock }) => {
    if (!saturnRef.current) return;

    const t = clock.getElapsedTime() * 0.8; // Adjust speed
    const radius = 50; // Larger orbit radius

    // ✅ Set orbit center to (-110, 0, 0)
    const centerX = -40;
    const centerZ = 0;

    saturnRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    saturnRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={saturnRef}
      object={model.scene}
      scale={[3, 3, 3]}
      position={[-110, 2, 0]} // Ensure correct starting position
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

// Main Saturn component
function Saturn() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SaturnModel />
    </Suspense>
  );
}

export default Saturn;
