import { useState } from 'react';
import { getSatelliteColor, getSatelliteTLE } from './utils';
import { Html } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { setSelectedSatellite } from '@/lib/satelliteSlice';
import { TSatellite } from '@/app/api/satellite_positions/types';
import { globalNow } from '@/components/utils/now';
import Path from './path';

export function Satellite({ tle_line1, tle_line2, object_name, category, classification_type, norad_cat_id }: TSatellite) {
  const [isShowTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const { satPos, smoothPoints } = getSatelliteTLE(globalNow, tle_line1, tle_line2) || {};

  return (
    <>
      <Path object_name={object_name} points={smoothPoints ?? []} />
      {satPos && (
        <mesh
          onPointerEnter={() => setShowTooltip(true)}
          onPointerLeave={() => setShowTooltip(false)}
          onClick={() => {
            dispatch(setSelectedSatellite({ object_name, satPos, classification_type, norad_cat_id, category, tle_line1, tle_line2 }));
          }}
          position={satPos}
        >
          <sphereGeometry args={[0.005, 10, 10]} />
          <meshStandardMaterial color={getSatelliteColor(category)} />
          {isShowTooltip && (
            <Html position={[0, 0.05, 0]} center>
              <div className="card bg-base-100 card-xs shadow-sm"
                style={{
                  minWidth: "max-content",
                  transform: "translate(-20%, -20%)"
                }}>
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
