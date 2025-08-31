import { useSelector } from 'react-redux';
import { Card, CardContent, CardTitle } from '../ui/card';
import { useGetMetaDataQuery } from '@/services/api';
import { RootState } from '@/lib/store';

export default function InfoCard() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.selectedId);

    if (selectedSatellite == null) {
        return null;
    }

    return (
        <Card className="bg-black text-white p-4 absolute bottom-4 right-4">
           <InfoCardContent selectedSatellite={selectedSatellite} />
        </Card>
    )
}

function InfoCardContent({ selectedSatellite }: { selectedSatellite: string }) {
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite);
    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading satellite data</div>;
    }

    console.log(data);

    return (
        <>
            <CardTitle>{data?.[0].object_name}</CardTitle>
            <CardContent className='pl-0'>
                <p className=""><span className="font-semibold">Satellite Name: </span>{data?.[0].object_name}</p>
                <p className=""><span className="font-semibold">NORAD ID: </span>{data?.[0].norad_cat_id}</p>
                <p className=""><span className="font-semibold">TLE Line 1: </span>{data?.[0].tle_line1}</p>
                <p className=""><span className="font-semibold">TLE Line 2: </span>{data?.[0].tle_line2}</p>
                <p className=""><span className="font-semibold">Mean Motion: </span>{data?.[0].mean_motion}</p>
                <p className=""><span className="font-semibold">Mean Motion Dot: </span>{data?.[0].mean_motion_dot}</p>
                <p className=""><span className="font-semibold">Mean Motion Ddot: </span>{data?.[0].mean_motion_ddot}</p>
                <p className=""><span className="font-semibold">Eccentricity: </span>{data?.[0].eccentricity}</p>
                <p className=""><span className="font-semibold">Inclination: </span>{data?.[0].inclination}</p>
                <p className=""><span className="font-semibold">RA of Asc Node: </span>{data?.[0].ra_of_asc_node}</p>
                <p className=""><span className="font-semibold">Arg of Pericenter: </span>{data?.[0].arg_of_pericenter}</p>
                <p className=""><span className="font-semibold">Mean Anomaly: </span>{data?.[0].mean_anomaly}</p>
                <p className=""><span className="font-semibold">Rev at Epoch: </span>{data?.[0].rev_at_epoch}</p>
                <p className=""><span className="font-semibold">Ephemeris Type: </span>{data?.[0].ephemeris_type}</p>
                <p className=""><span className="font-semibold">Bstar: </span>{data?.[0].bstar}</p>
            </CardContent>
        </>

    );
}