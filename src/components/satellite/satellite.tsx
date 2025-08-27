import { useState, useRef } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { getOrbitPath, getSatelliteColor } from './utils';
import * as satellite from 'satellite.js';
import { Html } from '@react-three/drei';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSatelliteId } from '@/lib/satelliteSlice';
import { RootState } from '@/lib/store';
import { TSatellite } from '@/app/api/satellites/types';

export function Satellite({ tle_line1, tle_line2, object_name, category }: TSatellite ) {
  const [isShowTooltip, setShowTooltip] = useState(false);
  const selectedSatellite = useSelector((state: RootState) => state.satellite.selectedId)
  const dispatch = useDispatch();

  // Fix the time at mount
  const fixedTimeRef = useRef<Date>(new Date());

  let points = getOrbitPath(tle_line1, tle_line2);
  if (points.length < 2) return null;

  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))
  const smoothPoints = curve.getPoints(1000);

  // Get Current Position
  const satrec = satellite.twoline2satrec(tle_line1, tle_line2);
  
  const result = satellite.propagate(satrec, fixedTimeRef.current);
  let satPos: [number, number, number] | null = null;
  if (result?.position) {
    const scale = 1 / 6371;
    satPos = [
      result.position.x * scale,
      result.position.y * scale,
      result.position.z * scale
    ]
  }

  return (
    <> 
    {selectedSatellite === object_name ? <Line points={smoothPoints.map(p => [p.x, p.y, p.z])} color="lightblue" lineWidth={1}  /> : null}
      
      {satPos && (
        <mesh 
          onPointerEnter={() => setShowTooltip(true)} 
          onPointerLeave={() => setShowTooltip(false)}
          onClick={() => dispatch(setSelectedSatelliteId(object_name))} 
          position={satPos}
          >
          <sphereGeometry args={[0.005, 10, 10]} />
          <meshStandardMaterial color={getSatelliteColor(category)} />
          {isShowTooltip && (
            <Html position={[0, 0.03, 0]}>
              <Card className='bg-black p-2' style={{ minWidth: "max-content" }}>
                <CardTitle className='text-white'>
                  {object_name}
                </CardTitle>
              </Card>
            </Html>
           )}
        </mesh>
      )}
    </>
  );
}
