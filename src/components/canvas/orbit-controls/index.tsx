import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
    
export default function OrbitalControls() {
  const controlsRef = useRef<any>(null);

  return <OrbitControls ref={controlsRef} />;
}
