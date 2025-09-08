import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function SpeedChart() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);

    console.log('selectedSatellite in SpeedChart:', selectedSatellite);

    return (
        <div>
            <p>Speed Chart</p>
            <LineChart width={400} height={200} data={[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="speed" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
}