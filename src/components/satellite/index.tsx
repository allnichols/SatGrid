import { useGetSatellitePositionsQuery } from '@/services/api';
import { Satellite } from './satellite';

export default function SatelliteContainer() {
  const { data, isLoading, isError } = useGetSatellitePositionsQuery();

  if(isLoading) return null; // add a loading state here

  if(isError) return null;

  if(data) {
   
    return (
      <>
        {data.map((sat) => (
          <Satellite
            key={sat.object_name}
            tle_line1={sat.tle_line1}
            tle_line2={sat.tle_line2}
            object_name={sat.object_name}
          />
        ))}
      </>
    );
  }
}