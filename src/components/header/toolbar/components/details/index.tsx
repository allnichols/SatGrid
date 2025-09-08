import { useDispatch, useSelector } from "react-redux";
import { toggleDetails } from "@/lib/toolbarSlice";
import { RootState } from "@/lib/store";

export default function DetailsBtn() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite.object_name);
    const dispatch = useDispatch();

    return (
        <button className={`btn btn-circle ${!selectedSatellite && "btn-disabled"}`} onClick={() => dispatch(toggleDetails())}>
            <a className="tooltip md:tooltip-bottom" data-tip="Details">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </a>
        </button >
    )
}