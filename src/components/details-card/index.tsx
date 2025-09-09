import { useGetMetaDataQuery } from '@/services/api';
import { closeDetails, toggleDetails } from '@/lib/toolbarSlice';
import { SkeletonContent, SkeletonTitle } from './loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function DetailsCard() {
    const isDetailsOpen = useSelector((state: RootState) => state.toolbar.isDetailsOpen);
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetMetaDataQuery(selectedSatellite ?? '', {
        skip: !selectedSatellite,
    });

    if (!selectedSatellite) return null;

    return (
        <div className={`
            card
            z-10
            bg-base-100
            top-4
            right-4
            h-[65%] w-[400px]
            absolute
            transition-transform duration-300
            ${isDetailsOpen ? 'translate-x-0' : 'translate-x-full'}
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
                        dispatch(closeDetails());
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