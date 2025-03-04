import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/model/sun.glb");

function SunModel() {
    const model = useGLTF("/model/sun.glb", true, true);

    useEffect(() => {
        // Cleanup function
        return () => {
            if (model) {
                Object.values(model).forEach(value => {
                    if (value?.dispose) {
                        value.dispose();
                    }
                });
            }
        };
    }, [model]);

    // Error handling
    if (!model) {
        console.error("Failed to load sun model");
        return null;
    }

    return (
        <primitive
            object={model.scene}
            scale={[.5, .5, .5]}
            position={[-20, 0, 0]}
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
function Sun() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <SunModel />
        </Suspense>
    );
}

export default Sun;