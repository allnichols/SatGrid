import { RootState } from '@/lib/store';
import { Line } from '@react-three/drei';
import { useSelector } from 'react-redux';
import * as THREE from 'three';


export default function SatellitePath({ object_name, points }: { object_name: string, points: THREE.Vector3[] }) {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);

    return (
        <>
            { 
             selectedSatellite === object_name ? 
             <Line 
                points={points.map(p => [p.x, p.y, p.z])} 
                color="white" 
                lineWidth={1} /> 
             : null
            }
        </>
    )
}