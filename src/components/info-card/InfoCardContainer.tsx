import { useEffect, useState } from 'react';
import { Card, CardAction, CardContent, CardTitle } from '../ui/card';
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetMetaDataQuery } from '@/services/api';
import { clearSelectedSatellite } from '@/lib/satelliteSlice';
import { SkeletonContent, SkeletonTitle } from './loading';
import { useDispatch } from 'react-redux';

export default function InfoCardContainer({ selectedSatellite }: { selectedSatellite: string }) {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite);


    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(timer);
    }, [selectedSatellite])

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
           {isLoading && <SkeletonTitle />} 
           <CardTitle>{data?.[0].object_name}</CardTitle>
            <CardAction>
                <Button
                    className='absolute top-2 right-4 text-lg'
                    onClick={() => { 
                        setVisible(false);
                       setTimeout(() => dispatch(clearSelectedSatellite()), 300);
                    }}
                >
                    x
                </Button>
            </CardAction>
            <CardContent className='pl-0 overflow-y-auto'>
                <div className="space-y-3">
                    {isError && <div>Error loading satellite data {selectedSatellite}</div>}
                    {isLoading && (
                        Array.from({length: 5}).map((_, index) => <SkeletonContent key={index} />)
                    )}
                    {Object.entries(data?.[0] || {}).map(([key, value]) => (
                        <div className='flex flex-row items-center sm:gap-3 p-2 border-b border-[#515151]' key={key}>
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