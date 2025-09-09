import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getAltitudeOverTime } from './utils/utils';
import { useMemo } from 'react';
import CustomTooltip from './components/CustomTooltip';

export default function AltitudeChart() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite);

    const altitudeData = useMemo(() => {
        if (!selectedSatellite.tle_line1 || !selectedSatellite.tle_line2) {
            return [];
        }
        return getAltitudeOverTime(selectedSatellite.tle_line1, selectedSatellite.tle_line2);
    }, [selectedSatellite.tle_line1, selectedSatellite.tle_line2]);

    const [minAlt, maxAlt] = useMemo(() => {
        if (altitudeData.length === 0) return [0, 0];
        const altitudes = altitudeData.map(d => d.altitude)
        const minValue = Math.min(...altitudes);
        const maxValue = Math.max(...altitudes);

        return [Math.floor(minValue - 5), Math.ceil(maxValue + 5)];
    }, [altitudeData]);

    if (!selectedSatellite.tle_line1 || !selectedSatellite.tle_line2) {
        return <div>Please select a satellite</div>;
    }

    return (

        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={altitudeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis
                    domain={[minAlt, maxAlt]}
                    label={{
                        value: "Altitude (km)",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <XAxis dataKey="time" label={{
                    value: "Time", angle: 0, position: "insideBottomLeft", offset: -5
                }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="altitude"
                    stroke="#82ca9d"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}