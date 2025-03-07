import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/model/uranus.glb");

function UranusModel() {
  const model = useGLTF("/model/uranus.glb", true, true);
  //   if (model) console.log("Hello");
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
    console.error("Failed to load Uranus model");
    return null;
  }

  return (
    <primitive
      object={model.scene}
      scale={[3, 3, 3]}
      position={[5, 2, 0]}
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
function Uranus() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UranusModel />
    </Suspense>
  );
}

export default Uranus;
