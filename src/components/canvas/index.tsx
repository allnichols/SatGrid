import { Canvas } from '@react-three/fiber'
import Earth from '@/components/canvas/earth'
import SatelliteContainer from '@/components/canvas/satellite'
import OrbitalControls from '@/components/canvas/orbit-controls';

export default function CanvasScene() {
    return (
        <Canvas style={{ height: "100vh" }}>
            <ambientLight intensity={5} />
            <directionalLight position={[3,3,3]} />
            <Earth />
            <SatelliteContainer />
            <OrbitalControls />
        </Canvas>
    )
}