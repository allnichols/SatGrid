import { useGetSatellitePositionsQuery } from '@/services/api';
import { SatellitePoints } from './satellite';
import { Satellite } from 'lucide-react';

export default function SatelliteContainer() {
  const { data, isLoading, isError } = useGetSatellitePositionsQuery();

  if(isLoading) return null; // add a loading state here

  if(isError) return null;

  if(data) {
    return (
      <SatellitePoints satellites={data} />
    );
  }
}