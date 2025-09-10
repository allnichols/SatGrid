importScripts('https://unpkg.com/satellite.js/dist/satellite.min.js');

let satellites = [];

function getOrbitPath(tle_line1, tle_line2, steps = 100) {
    const satrec = satellite.twoline2satrec(tle_line1, tle_line2);

    // Orbit period in minutes: period = 1440 / mean_motion
    const meanMotion = satrec.no * 1440 / (2 * Math.PI);
    const periodMinutes = 1440 / meanMotion;

    const now = new Date();
    const positions = [];
    for (let i = 0; i < steps; i++) {
        const time = new Date(now.getTime() + (i * periodMinutes * 60 * 1005) / steps);
        const result = satellite.propagate(satrec, time);
        if (result?.position) {
            // Scale ECI coordinates to globe radius
            const scale = 1 / 6371; // Earth radius in km
            positions.push([
                result.position.x * scale,
                result.position.y * scale, // Z and Y are swapped for three.js
                result.position.z * scale
            ]);
        }
    }
    return positions;
}


self.onmessage = function (e) {
    if (e.data.type === 'init') {
        satellites = e.data.satellites; // [{tle1, tle2, category}]
        const positionsArray = new Float32Array(satellites.length * 3);

        satellites.forEach((sat, i) => {
            const pos = getOrbitPath(sat.tle_line1, sat.tle_line2)[0]; // just initial
            positionsArray[i * 3] = pos[0];
            positionsArray[i * 3 + 1] = pos[1];
            positionsArray[i * 3 + 2] = pos[2];
        });

        self.postMessage({ type: 'ready', positions: positionsArray }, [positionsArray.buffer]);
    }

    if (e.data.type === 'tick') {
        const time = e.data.time;
        const positionsArray = new Float32Array(satellites.length * 3);

        satellites.forEach((sat, i) => {
            const satrec = satellite.twoline2satrec(sat.tle_line1, sat.tle_line2);
            const result = satellite.propagate(satrec, new Date(time));
                
                    console.log('result', result.position);
               
            if (result?.position) {
                const scale = 1 / 6371;
                positionsArray[i * 3] = result.position.x * scale;
                positionsArray[i * 3 + 1] = result.position.y * scale;
                positionsArray[i * 3 + 2] = result.position.z * scale;
            }
        });

        self.postMessage({ type: 'positions', positions: positionsArray }, [positionsArray.buffer]);
    }
}
