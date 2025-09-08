import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getAltitudeOverTime, getAltitudeData } from './utils/utils';
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

    if (!selectedSatellite.tle_line1 || !selectedSatellite.tle_line2) {
        return <div>Please select a satellite</div>;
    }

    console.log(altitudeData);

    return (
        
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={altitudeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{
                    value: "Time", angle: 0, position: "insideBottomLeft", offset: -5
                }} />
                <YAxis
                    label={{
                        value: "Altitude (km)",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
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