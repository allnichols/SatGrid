import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearSelectedSatellite } from "@/lib/satelliteSlice";

// deselects the current satellite
export default function DeselectSatelliteBtn() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);
    const dispatch = useDispatch();

    return (
        <button className={`btn btn-circle ${!selectedSatellite && "btn-disabled"}`}
            onClick={() => {
                if (!selectedSatellite) {
                    return;
                };
                dispatch(clearSelectedSatellite())
            }}>
            <a className="tooltip" data-tip={selectedSatellite ? "Deselect Satellite" : "No Satellite Selected"}>
                {selectedSatellite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-on">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-off">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
                    </svg>
                )}
            </a>
        </button>
    )
}