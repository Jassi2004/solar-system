import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Preload the model
useGLTF.preload("/model/venus.glb");

function VenusModel() {
  const model = useGLTF("/model/venus.glb");
  const venusRef = useRef(); // Ref for Venus's position

  useFrame(({ clock }) => {
    if (!venusRef.current) return;

    const t = clock.getElapsedTime() * 0.8; // Adjust speed
    const radius = 20; // Larger orbit radius

    // ✅ Set orbit center to (-55, 0, 0)
    const centerX = -50;
    const centerZ = 0;

    venusRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    venusRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={venusRef}
      object={model.scene}
      scale={[1.2, 1.2, 1.2]}
      position={[-55, 1, 0]} // Ensure correct starting position
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

// Main Venus component
function Venus() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VenusModel />
    </Suspense>
  );
}

export default Venus;
