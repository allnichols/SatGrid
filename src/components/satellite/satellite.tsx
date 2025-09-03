import { useState, useRef } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { getSatelliteColor, getSatelliteTLE } from './utils';
import { Html } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { setSelectedSatellite } from '@/lib/satelliteSlice';
import { TSatellite } from '@/app/api/satellite_positions/types';
import Path from './path';

export function Satellite({ tle_line1, tle_line2, object_name, category }: TSatellite) {
  const [isShowTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const fixedTimeRef = useRef<Date>(new Date());
  const { satPos, smoothPoints } = getSatelliteTLE(fixedTimeRef, tle_line1, tle_line2) || {};

  return (
    <>
      <Path object_name={object_name} points={smoothPoints ?? []} />
      {satPos && (
        <mesh
          onPointerEnter={() => setShowTooltip(true)}
          onPointerLeave={() => setShowTooltip(false)}
          onClick={() => {
            dispatch(setSelectedSatellite({ object_name, satPos }));
          }}
          position={satPos}
        >
          <sphereGeometry args={[0.005, 10, 10]} />
          <meshStandardMaterial color={getSatelliteColor(category)} />
          {isShowTooltip && (
            <Html position={[0.06, 0.04, 0.03]}>
              <div className="card bg-base-100 card-xs shadow-sm" style={{ minWidth: "max-content" }}>
                <div className="card-body">
                  <h2 className="card-title">{object_name}</h2>
                </div>
              </div>
            </Html>
          )}
        </mesh>
      )}
    </>
  );
}
