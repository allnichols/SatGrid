import { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { SatellitePosition } from '@/types/types';
import { Html } from '@react-three/drei';


export default function Satellite({ satellite_position }: {satellite_position: SatellitePosition}) {
     const [isShowTooltip, setShowTooltip] = useState(false)
      // Globe radius (should match your Earth sphere's radius)
      const earthRadius = 1; // Default Sphere radius is 1
    
      // Convert degrees to radians
      const phi = (90 - satellite_position.latitude) * Math.PI / 180;
      const theta = (satellite_position.longitude + 180) * Math.PI / 180;
    
      // Scale altitude to your globe's radius
      const r = earthRadius + satellite_position.altitude_km;
    
      // Spherical to Cartesian conversion
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
    
      return (
        <mesh onPointerOver={() => setShowTooltip(true)} onPointerOut={() => setShowTooltip(false)}  position={[x,y,z]}>
          <sphereGeometry args={[0.005, 8, 8]} />
          <meshStandardMaterial color={'red'} />
          {isShowTooltip && (
          <Html position={[0,0.02,0]} center>
            <Card className='bg-black p-2' style={{ minWidth: "max-content" }}>
              <CardTitle className='text-white'>
                {satellite_position.object_name}
              </CardTitle>
            </Card>
          </Html>
        )}
        </mesh>
      )
}