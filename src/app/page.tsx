'use client'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import SatelliteContainer from '@/components/satellite';
import InfoCard from '@/components/info-card';



function Earth() {
  // todo: allow users to choose the map type
  const texture = useTexture('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  return (
    <Sphere>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

export default function Home() {

  return (
    <div className="flex items-center justify-center h-screen bg-black relative overflow-hidden">
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} />
        <Earth />
        <SatelliteContainer />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
      <InfoCard />
    </div>
  );
}
