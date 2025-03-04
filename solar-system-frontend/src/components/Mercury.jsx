import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/model/mercury.glb");

function MercuryModel() {
  const model = useGLTF("/model/mercury.glb", true, true);
  // if(model) console.log("Hello")
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
    console.error("Failed to load Mercury model");
    return null;
  }

  return (
    <primitive
      object={model.scene}
      scale={[0.009, 0.009, 0.009]}
      position={[-35, 0, 0]}
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
function Mercury() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MercuryModel />
    </Suspense>
  );
}

export default Mercury;
