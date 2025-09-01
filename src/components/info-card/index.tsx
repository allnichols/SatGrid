import { useDispatch, useSelector } from 'react-redux';
import { Card, CardAction, CardContent, CardTitle } from '../ui/card';
import { Button } from "@/components/ui/button"
import { useGetMetaDataQuery } from '@/services/api';
import { RootState } from '@/lib/store';
import { clearSelectedSatellite } from '@/lib/satelliteSlice';
import { useEffect, useState } from 'react';

export default function InfoCard() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.selectedId);

    if (selectedSatellite == null) {
        return null;
    }

    return <InfoCardContent selectedSatellite={selectedSatellite} />

}

function InfoCardContent({ selectedSatellite }: { selectedSatellite: string }) {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite);


    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(timer);
    }, [selectedSatellite])

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error loading satellite data</div>;
    // }

    return (
        <Card className={`
            bg-[#2A2A2A] text-white p-4 absolute
            bottom-0
            right-0
            w-full
            h-1/2
            sm:w-95 sm:h-50 sm:bottom-4 sm:right-4
            md:w-100 md:h-40 md:bottom-10 md:right-8
            md:h-[90%] 
            overflow-y-auto
            border-0
            rounded-t-md
            transition-transform duration-300
            ${visible ? 'translate-x-0' : 'translate-x-full'}
        `}>
            <CardTitle>{data?.[0].object_name}</CardTitle>
            <CardAction>
                <Button
                    className='absolute top-2 right-4 text-lg'
                    onClick={() =>{ 
                        setVisible(false);
                       setTimeout(() => dispatch(clearSelectedSatellite()), 300);
                    }}
                >
                    x
                </Button>
            </CardAction>
            <CardContent className='pl-0 overflow-y-auto'>
                <div className="space-y-3">
                    {Object.entries(data?.[0] || {}).map(([key, value]) => (
                        <div className='flex flex-row items-center sm-gap-3' key={key}>
                            <span className="font-medium mt-2 mb-2 min-w-32">
                                {key.replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase())}:
                            </span>
                            <span className="flex-1 ms-2">{value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}