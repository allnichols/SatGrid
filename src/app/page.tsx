'use client'
import { Canvas } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import SatelliteContainer from '@/components/canvas/satellite';
import OrbitalControls from '@/components/canvas/orbit-controls';
import Header from '@/components/header';
import Toolbar from '@/components/header/toolbar';
import DetailsCard from '@/components/details-card';
import InfoCard from '@/components/info-card';
import ChartsContainer from '@/components/charts';
import CanvasScene from '@/components/canvas';

export default function Home() {

  return (
    <div className="flex items-center justify-center h-screen bg-black relative overflow-hidden">
      <Header />
      <Toolbar />
      <DetailsCard />
      <InfoCard />
      <ChartsContainer />
      <CanvasScene />
    </div>
  );
}
