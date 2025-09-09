import { closeDetails, toggleCharts  } from "@/lib/toolbarSlice"
import { RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"

export default function ChartsBtn() {
    const dispatch = useDispatch();
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);
    const isChartsOpen = useSelector((state: RootState) => state.toolbar.isChartsOpen);
    const isDetailsOpen = useSelector((state: RootState) => state.toolbar.isDetailsOpen);

    const handleToggleCharts = () =>{
        if(isDetailsOpen) {
            dispatch(closeDetails());
        }
        dispatch(toggleCharts());
    };

    return (
        <button
            className={`btn btn-circle ${!selectedSatellite && "btn-disabled"} ${isChartsOpen && "btn-active"}`}
            onClick={handleToggleCharts}>
            <a className="tooltip md:tooltip-bottom" data-tip="Stats">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            </a>
        </button>
    )
};