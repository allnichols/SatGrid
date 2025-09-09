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
            card z-10 bg-base-100 top-4 right-4 h-[500px] w-[400px]
            absolute transition-transform duration-300
            ${isDetailsOpen ? 'translate-x-0' : 'translate-x-[105%]'}
        `}>
            <div className="card-header flex justify-between p-4 border-b cursor-pointer" onClick={() => dispatch(toggleDetails())}>
                <div className='px-4 pt-4 pb-0'>
                    <h2 className='text-lg uppercase font-semibold'>
                        {isLoading ? <SkeletonTitle /> : data?.[0].object_name}
                    </h2>
                </div>
                <svg
                    onClick={() => {
                        dispatch(closeDetails());
                    }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
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