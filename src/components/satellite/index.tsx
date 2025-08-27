import { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { SatellitePosition } from '@/types/types';
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
        result.position.z * scale, // Z and Y are swapped for three.js
        result.position.y * scale
      ]);
    }
  }
  return positions;
}


export default function SatellitePath({ tle_line1, tle_line2 }: { tle_line1: string, tle_line2: string }) {
  let points = getOrbitPath(tle_line1, tle_line2);
  if (points.length < 2) return null;
  return <Line points={points} color="yellow" lineWidth={.5} />;
}