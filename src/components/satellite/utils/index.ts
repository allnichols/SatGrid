import * as satellite from 'satellite.js';

export function getOrbitPath(tle_line1: string, tle_line2: string, steps = 500) {
  const satrec = satellite.twoline2satrec(tle_line1, tle_line2);

  // Orbit period in minutes: period = 1440 / mean_motion
  const meanMotion = satrec.no * 1440 / (2 * Math.PI);
  const periodMinutes = 1440 / meanMotion;

  const now = new Date();
  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const time = new Date(now.getTime() + (i  * periodMinutes * 60 * 1005) / steps);
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
