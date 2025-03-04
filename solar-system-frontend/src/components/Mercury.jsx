import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useContext } from "react";
import { useFrame } from "@react-three/fiber";
// import { AppContext } from "../AppContext"; // Import AppContext

// Preload the model
useGLTF.preload("/model/mercury.glb");

function MercuryModel() {
  const model = useGLTF("/model/mercury.glb");
  const mercuryRef = useRef();
  const { planetSettings } = useContext(AppContext); // Get settings from context
  const { speed, radius, centerX, centerZ, scale } = planetSettings.mercury;

  useFrame(({ clock }) => {
    if (!mercuryRef.current) return;

    const t = clock.getElapsedTime() * speed; // Use dynamic speed
    mercuryRef.current.position.x = centerX + radius * Math.cos(t);
    mercuryRef.current.position.z = centerZ + radius * Math.sin(t);
  });

  return (
    <primitive
      ref={mercuryRef}
      object={model.scene}
      scale={scale}
      position={[centerX, 0, centerZ]} // Start at center
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
