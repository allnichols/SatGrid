import { useSelector } from 'react-redux';
import { Card, CardTitle } from '../ui/card';
import { useGetMetaDataQuery } from '@/services/api';
import { RootState } from '@/lib/store';
import { useParams } from 'next/navigation';


export default function InfoCard() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.selectedId);

    if (selectedSatellite == null) {
        return null;
    }

    return (
        <Card className="absolute top-4 right-4">
           <InfoCardContent selectedSatellite={selectedSatellite} />
        </Card>
    )
}

function InfoCardContent({ selectedSatellite }: { selectedSatellite: string }) {
    const router = useParams();
    const { satelliteName } = router;
    console.log('Satellite Name:', satelliteName);
    const { data, isLoading, isError } = useGetMetaDataQuery(satelliteName as string);
    console.log(data)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading satellite data</div>;
    }

    return (
        <>
            <CardTitle>{data?.[0].object_name}</CardTitle>
        </>

    );
}