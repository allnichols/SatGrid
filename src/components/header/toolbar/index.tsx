import DeselectSatelliteBtn from "@/components/header/toolbar/components/deselect";
import DetailsBtn from "@/components/header/toolbar/components/details";
import ChartsBtn from "@/components/header/toolbar/components/charts";

export default function Toolbar() {
    return (
        <div className="absolute bottom-5 z-10 h-16 sm:top-4">
            <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                <DeselectSatelliteBtn/>
                <DetailsBtn />
                <ChartsBtn />
            </ul>
        </div>
    );
}