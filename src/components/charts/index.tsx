import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleCharts } from '@/lib/toolbarSlice';
import SpeedChart from './speed-chart/SpeedChart';

export default function ChartsContainer() {
    const isChartsOpen = useSelector((state: RootState) => state.toolbar.isChartsOpen);
    const dispatch = useDispatch();
    return (
        <div className={`
        card z-10 bg-base-100 top-4 right-4 h-[300px] w-[400px] 
        absolute transition-transform duration-300
        ${isChartsOpen ? 'translate-x-0' : 'translate-x-[105%]'}
        `} onClick={() => {
            dispatch(toggleCharts());
        }}>
            <SpeedChart />
        </div>
    )
}