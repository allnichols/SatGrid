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

            <div className="card-header p-4 border-b cursor-pointer">
                <h2 className="card-title text-lg">{selectedSatellite ? `${selectedSatellite}` : 'No satellite selected'}</h2>
                <p className="text-sm opacity-70"
                    onClick={() => {
                        dispatch(closeCharts());
                    }}>Click to close</p>
            </div>
            <div className="divider m-0" />
            <div className="card-body p-2 h-full">
                <AltitudeChart />
                <div className="divider my-2" />
                <SpeedChart />
            </div>
        </div>
    )
}