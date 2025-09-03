import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import InfoCardContainer from './InfoCardContainer';


export default function InfoCard() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);

    if (selectedSatellite == null)  return null;

    return <InfoCardContainer selectedSatellite={selectedSatellite} />
}

