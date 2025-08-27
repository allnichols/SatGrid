import { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import * as satellite from 'satellite.js';
import { Html } from '@react-three/drei';
import { Line } from '@react-three/drei';

function getOrbitPath(tle_line1: string, tle_line2: string, steps = 200) {
const satrec = satellite.twoline2satrec(tle_line1, tle_line2);
  const now = new Date();
  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const time = new Date(now.getTime() + i * 60 * 1000);
    const result = satellite.propagate(satrec, time);
    if (result?.position) {
      // Scale ECI coordinates to globe radius
      const scale = 1 / 6371; // Earth radius in km
      positions.push([
        result.position.x * scale,
        result.position.y * scale, // Z and Y are swapped for three.js
        result.position.z * scale
      ]);
    }
  }
  return positions;
}


export default function SatellitePath({ tle_line1, tle_line2, object_name }: { tle_line1: string, tle_line2: string, object_name: string }) {
  let points = getOrbitPath(tle_line1, tle_line2);
  if (points.length < 2) return null;

  // Get Current Position
  const satrec = satellite.twoline2satrec(tle_line1, tle_line2);
  const now = new Date();
  const result = satellite.propagate(satrec, now);
  let satPos: [number, number, number] | null = null;
  if(result?.position) {
    const scale = 1 / 6371;
    satPos = [
      result.position.x * scale,
      result.position.y * scale,
      result.position.z * scale
    ]
  }

  return (
    <>
      <Line points={points} color="yellow" lineWidth={.5} />
      {satPos && (
        <mesh position={satPos}>
          <sphereGeometry args={[0.01, 10, 10]} />
          <meshStandardMaterial color="red" />
          {/* <Html>
            <Card className='bg-black p-2' style={{ minWidth: "max-content" }}>
              <CardTitle className='text-white'>
                {object_name}
              </CardTitle>
            </Card>
          </Html> */}
        </mesh>
      )}
    </>
);
}