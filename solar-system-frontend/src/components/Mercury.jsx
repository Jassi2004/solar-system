import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/model/mercury.glb");

function MercuryModel() {
  const model = useGLTF("/model/mercury.glb");
  const mercuryRef = useRef(); // Ref for Mercury's position

  useFrame(({ clock }) => {
    if (!mercuryRef.current) return;

    const t = clock.getElapsedTime() * 1; // Adjust speed
    const radius = 10; // Orbit radius

    // ✅ Set orbit center to (-35, 0, 0)
    const centerX = -45;
    const centerZ = 0;

    mercuryRef.current.position.x = centerX + radius * Math.cos(t); // Orbit around X
    mercuryRef.current.position.z = centerZ + radius * Math.sin(t); // Orbit around Z
  });

  return (
    <primitive
      ref={mercuryRef}
      object={model.scene}
      scale={[0.009, 0.009, 0.009]}
      position={[-35, 0, 0]} // Ensure correct starting position
      rotation={[0, 0, 0]}
      dispose={null}
    />
  );
}

// Fallback component while loading
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

// Main Mercury component
function Mercury() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MercuryModel />
    </Suspense>
  );
}

export default Mercury;
