'use client'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import { useGetSatellitePositionsQuery } from "@/services/api";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedId } from "@/lib/satelliteSlice";


function Earth() {
  // todo: allow users to choose the map type
  const texture = useTexture('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  return (
    <Sphere>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

 type SatellitePosition = {
      satellite_id: number;
      timestamp: string;
      latitude: number;
      longitude: number;
      altitude_km: number;
      velocity_kms: number | undefined;
  };

function Satellite({ data }: { data: SatellitePosition}) {
  // Globe radius (should match your Earth sphere's radius)
  const earthRadius = 1; // Default Sphere radius is 1

  // Convert degrees to radians
  const phi = (90 - data.latitude) * Math.PI / 180;
  const theta = (data.longitude + 180) * Math.PI / 180;

  // Scale altitude to your globe's radius
  const r = earthRadius + data.altitude_km;

  // Spherical to Cartesian conversion
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);
  return (
    <mesh onPointerEnter={() => console.log(data)}  position={[x,y,z]}>
      <sphereGeometry args={[0.004, 8, 8]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  )

}

export default function Home() {
  const { data } = useGetSatellitePositionsQuery();
  const selectedId = useSelector((state: any) => state.satellite.selectedId);
  const dispatch = useDispatch();
  
  return (
    <div className="flex items-center justify-center h-screen">
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Earth />
        {data && data.map((datum) => {
          return <Satellite key={datum.id} data={datum} />
        })}
        <OrbitControls target={[0,0,0]}/>
      </Canvas>
    </div>
  );
}
