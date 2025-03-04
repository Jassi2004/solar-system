import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Preload the model
useGLTF.preload("/model/saturn.glb");

function SaturnModel() {
    const model = useGLTF("/model/saturn.glb", true, true);
    if(model) console.log("Hello")
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
        console.error("Failed to load Saturn model");
        return null;
    }

    return (
        <primitive
            object={model.scene}
            scale={[.5, .5, .5]}
            position={[3,0,0]}
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
function Saturn() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <SaturnModel />
        </Suspense>
    );
}

export default Saturn;