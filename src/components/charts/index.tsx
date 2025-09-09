import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { closeCharts } from '@/lib/toolbarSlice';
import AltitudeChart from './altitude';
import SpeedChart from './speed';

export default function ChartsContainer() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);
    const isChartsOpen = useSelector((state: RootState) => state.toolbar.isChartsOpen);
    const dispatch = useDispatch();

    if (!selectedSatellite) return null;

    return (
        <div className={`
        card z-10 bg-base-100 top-4 right-4 h-[500px] w-[400px] 
        absolute transition-transform duration-300
        ${isChartsOpen ? 'translate-x-0' : 'translate-x-[105%]'}
        `} >

            <div className="card-header flex justify-between p-4 border-b cursor-pointer">
                <h2 className="card-title text-lg">{selectedSatellite ? `${selectedSatellite}` : 'No satellite selected'}</h2>
                <svg
                    onClick={() => {
                        dispatch(closeCharts());
                    }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
            <div className="card-body p-2 h-full">
                <AltitudeChart />
                <div className="divider my-2" />
                <SpeedChart />
            </div>
        </div>
    )
}