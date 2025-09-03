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

  // default starting position
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Smoothly interpolate the camera position towards the target
    if (controlsRef.current && target != null) {
      // globes position
      const globeCenter = new THREE.Vector3(0, 0, 0);
      // Grab target position
      const targetPosition = new THREE.Vector3(...target as [number, number, number]);

      const direction = targetPosition.clone().sub(globeCenter).lerp(camera.position, 0.1);
      const cameraDistance = .25;
      const cameraPosition = targetPosition.clone().add(direction.multiplyScalar(cameraDistance));
      camera.position.lerp(cameraPosition, 0.1);

      // set where controls will be
      controlsRef.current.target.lerp(targetPosition, 0.1);

      // update controls
      controlsRef.current.update();

    } else if (controlsRef.current && target == null) {
      // No satellite selected: reset camera and controls target
      controlsRef.current.target.lerp(defaultTarget.current, 0.1);
      controlsRef.current.update();
    }
  });
  return <OrbitControls ref={controlsRef} />;
}
