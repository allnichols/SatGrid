import { useEffect, useState } from 'react';
import { useGetMetaDataQuery } from '@/services/api';
import { clearSelectedSatellite } from '@/lib/satelliteSlice';
import { SkeletonContent, SkeletonTitle } from './loading';
import { useDispatch } from 'react-redux';

export default function InfoCardContainer({ selectedSatellite }: { selectedSatellite: string }) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite);


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
            <div className='px-4 pt-4 pb-0'>
            {isLoading
                    ? <SkeletonTitle />
                    : <h2 className='text-lg uppercase font-semibold'>{data?.[0].object_name}</h2>
                }
            </div>
            <div className='card-body overflow-y-auto pl-1'>
                
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
                    <ul className='list '>
                        {Object.entries(data?.[0] || {}).map(([key, value]) => (
                            <li className='list-row flex flex-row ' key={key}>
                                <div>
                                    <p className="text-sm uppercase font-semibold opacity-60">{key.replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase())}: </p> 
                                    
                                </div>
                                <div>
                                    <p className="text-sm">{value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
}