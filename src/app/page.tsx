'use client'
import { Canvas } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import SatelliteContainer from '@/components/satellite';
import OrbitalControls from '@/components/orbit-controls';
import Header from '@/components/header';
import Toolbar from '@/components/header/toolbar';
import DetailsCard from '@/components/details-card';
import InfoCard from '@/components/info-card';
import ChartsContainer from '@/components/charts';



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
      <Header />
      <Toolbar />
      <DetailsCard />
      <InfoCard />
      <ChartsContainer />
    
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={5} />
        <directionalLight position={[3,3,3]} />
        <Earth />
        <SatelliteContainer />
        <OrbitalControls />
      </Canvas>
    </div>
  );
}
