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

export function getSpeedData(tleLine1: string, tleLine2: string, steps = 100) {
    const results: { time: Date; speed: number }[] = [];

    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    const meanMotion = satrec.no * 1440 / (2 * Math.PI); // in revs per day
    const periodMinutes = 1440 / meanMotion; // in minutes

    const now = new Date();

    for(let i = 0; i <= steps; i++) {
        const time = new Date(now.getTime() + (i * periodMinutes * 60 * 1000) / steps);
        const gmst = satellite.gstime(time);
        const posVel = satellite.propagate(satrec, time);

        if(posVel?.velocity) {
            const { x, y, z } = posVel.velocity;
            const speedKms = Math.sqrt(x*x + y*y + z*z); // in km/s
            results.push({
                time, 
                speed: Number(speedKms.toFixed(4))
            })
        }
    }

    return results;
}
