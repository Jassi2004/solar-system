import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/model/neptune.glb");

function NeptuneModel() {
  const model = useGLTF("/model/neptune.glb", true, true);
  if (model) console.log("Hello");
  useEffect(() => {
    // Cleanup function
    return () => {
      if (model) {
        Object.values(model).forEach((value) => {
          if (value?.dispose) {
            value.dispose();
          }
        });
      }
    };
  }, [model]);

  // Error handling
  if (!model) {
    console.error("Failed to load Neptune model");
    return null;
  }

  return (
    <primitive
      object={model.scene}
      scale={[0.25, 0.25, 0.25]}
      position={[25, 6, 0]}
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
      <meshStandardMaterial color="gray" wireframe={true} />
    </mesh>
  );
}

// Main component with error boundary
function Neptune() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NeptuneModel />
    </Suspense>
  );
}

export default Neptune;
