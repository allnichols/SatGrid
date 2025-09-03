import { useEffect, useState } from 'react';
import { useGetMetaDataQuery } from '@/services/api';
import { clearSelectedSatellite } from '@/lib/satelliteSlice';
import { SkeletonContent, SkeletonTitle } from './loading';
import { useDispatch } from 'react-redux';

export default function InfoCardContainer({ selectedSatellite }: { selectedSatellite: string }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(timer);
    }, [selectedSatellite])

    return (
        <div className={`
            card
            bg-base-100
            top-0
            right-0
            h-[65%] w-[400px]
            absolute
            transition-transform duration-300
            ${visible ? 'translate-x-0' : 'translate-x-full'}
        `}>
            <div className='card-body overflow-y-auto'>
                {isLoading
                    ? <SkeletonTitle />
                    : <h2 className='card-title'>{data?.[0].object_name}</h2>
                }
                <div 
                className='absolute top-2 right-10 cursor-pointer' 
                onClick={() => {
                    setVisible(false);
                    setTimeout(() => dispatch(clearSelectedSatellite()), 300);
                }}>x</div>
                <div>
                    {isError && <div>Error loading satellite data {selectedSatellite}</div>}
                    {isLoading && (
                        Array.from({ length: 5 }).map((_, index) => <SkeletonContent key={index} />)
                    )}
                    {Object.entries(data?.[0] || {}).map(([key, value]) => (
                        <div className='flex flex-row items-center sm:gap-3 p-1 border-b border-[#515151]' key={key}>
                            <span className="font-medium mb-2 min-w-32">
                                {key.replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase())}:
                            </span>
                            <span className="flex-1 ms-2">{value}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}