// LightHelpers.jsx
import { useEffect } from "react";
import * as THREE from "three";

const LightHelpers = ({ lightRef }) => {
  useEffect(() => {
    if (lightRef.current) {
      const helper = new THREE.PointLightHelper(lightRef.current);
      lightRef.current.parent.add(helper);
      
      return () => {
        lightRef.current.parent.remove(helper);
      };
    }
  }, [lightRef]);

  return null;
};

export default LightHelpers;