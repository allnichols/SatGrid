import { OrbitControls } from "@react-three/drei";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Vector3 } from "@react-three/fiber";
    
export default function OrbitalControls() {
  const target = useSelector((state: RootState) => state.satellite.coordinates);
  return <OrbitControls target={target as Vector3 || [0, 0, 0]}  />;
}
