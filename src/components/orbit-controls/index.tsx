import { OrbitControls } from "@react-three/drei";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useFrame, Vector3, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
    
export default function OrbitalControls() {
  const target = useSelector((state: RootState) => state.satellite.coordinates);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  useFrame(() => {
    // Smoothly interpolate the camera position towards the target
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(...target), 0.1);
    
      controlsRef.current.update();

    }
  });
  return <OrbitControls ref={controlsRef} />;
}
