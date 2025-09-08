import * as satellite from 'satellite.js';
import { globalNow } from '@/components/utils/now';

export function getAltitudeOverTime(tleLine1: string, tleLine2: string, minutes = 100) {
    const results: { time: Date; altitude: number }[] = [];
    const now = new Date();

    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    for (let i = 0; i <= minutes; i++) {
        const time = new Date(now.getTime() + i * 60000);
        const posVel = satellite.propagate(satrec, time);
        const gmst = satellite.gstime(time); //sidereal time

        if(posVel?.position) {
            const geo = satellite.eciToGeodetic(posVel.position, gmst);
            const altitudeKm = geo.height;
            results.push({ time: time, altitude: Number(altitudeKm.toFixed(4)) });
        }
    }

    return results;
}

export function getAltitudeData(tleLine1: string, tleLine2: string, minutes = 100) {
    const results: { time: string; altitude: number, speed: number }[] = [];
    const now = new Date(globalNow);

    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    for (let i = 0; i <= minutes; i++) {
        const time = new Date(now.getTime() + i * 60000);
        const gmst = satellite.gstime(time); //sidereal time
        const posVel = satellite.propagate(satrec, time);

        if (posVel?.position && posVel.velocity) {
            const geo = satellite.eciToGeodetic(posVel.position, gmst);
            const altitudeKm = geo.height;

            // Speed
            const { x, y, z } = posVel.velocity;
            const speed = Math.sqrt(x * x + y * y + z * z) * 1000; // convert km/s to m/s
            const speedKms = speed / 1000; // convert m/s to km/h

            results.push({
                time: time.getHours() + ':' + time.getMinutes(), //HH:MM
                altitude: Number(altitudeKm.toFixed(4)),
                speed: Number(speedKms.toFixed(4))
            })
        }
    }

    return results;
}
