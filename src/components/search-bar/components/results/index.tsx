import { useDispatch } from "react-redux"
import { setSelectedSatellite } from "@/lib/satelliteSlice"
import * as satellite from 'satellite.js';


type ResultProps = {
    results: Array<{ 
        object_name: string, 
        category?: string, 
        tle_line1: string, 
        tle_line2: string }>
}

function calculatePosition(tle_line1:string, tle_line2:string) {
    const satrec = satellite.twoline2satrec(tle_line1, tle_line2);
    const result = satellite.propagate(satrec, new Date());
    if (result?.position) {
        const scale = 1 / 6371;
        return [
            result.position.x * scale,
            result.position.y * scale,
            result.position.z * scale
        ] as [number, number, number];
    }
    return null;
}

export default function Results({ results }: ResultProps) {
    const dispatch = useDispatch();

    return (
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto max-h-60">
            {results.map(result => {
                return (
                    <li
                        key={result.object_name}
                        className="list-row flex hover:bg-base-300"
                        onClick={() => {
                            // clean this
                            const satPos = calculatePosition(result.tle_line1, result.tle_line2);
                            if (satPos) {
                                dispatch(setSelectedSatellite({ object_name: result.object_name, satPos }));
                            }
                        }}
                    >
                        <div>
                            <div>{result.object_name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{result.category}</div>
                        </div>

                    </li>
                )
            })}
        </ul>
    )
}