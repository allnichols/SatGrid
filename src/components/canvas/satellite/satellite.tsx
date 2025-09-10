import { useState, useMemo, useRef, useEffect } from 'react';
import { getSatelliteColor, getSatelliteTLE } from './utils';
import { Html } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { setSelectedSatellite } from '@/lib/satelliteSlice';
import { TSatellite } from '@/app/api/satellite_positions/types';
import { globalNow } from '@/components/utils/now';
import Path from './path';
import { satellitePositionsApi } from '@/services/api';
import * as THREE from 'three';

export function SatellitePoints({ satellites }: { satellites: TSatellite[] }) {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL('./utils/satelliteWorker.js', import.meta.url));
    workerRef.current = worker;

    // send TLE data to the worker
    worker.postMessage({
      type: 'init', satellites: satellites.map(s =>
        ({ tle_line1: s.tle_line1, tle_line2: s.tle_line2, category: s.category }))
    });

    worker.onmessage = (e) => {
      if (e.data.type === 'ready' || e.data.type === 'positions') {
        setPositions(e.data.positions);
      }
    };

    return () => worker.terminate();
  }, [satellites])

  useEffect(() => {
    let frame: number;
    const tick = () => {
      if (workerRef.current) workerRef.current.postMessage({ type: 'tick', time: performance.now() });
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!positions) return null;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.01} color="white" sizeAttenuation />
    </points>
  );
}
