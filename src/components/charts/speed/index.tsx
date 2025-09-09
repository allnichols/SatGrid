import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getSpeedData } from '../altitude/utils/utils';
import CustomTooltip from '../altitude/components/CustomTooltip';

export default function SpeedChart() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite);

    if (!selectedSatellite.tle_line1 || !selectedSatellite.tle_line2) {
        return <div>Please select a satellite</div>;
    }

    const speedData = getSpeedData(selectedSatellite.tle_line1, selectedSatellite.tle_line2);

    const [minSpeed, maxSpeed] = [Math.min(...speedData.map(d => d.speed)) - 1, Math.max(...speedData.map(d => d.speed)) + 1];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{
                    value: "Time", angle: 0, position: "insideBottomLeft", offset: -5
                }} />
                <YAxis
                    domain={[minSpeed, maxSpeed]}
                    label={{
                        value: "Speed (km/h)",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#82ca9d"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
    
}