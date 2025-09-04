import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

type Satellite = {
    object_name?: string | null;
    category?: string | null;
    classification_type?: string | null;
    norad_cat_id?: number | null;
    coordinates?: number[] | null;
};

// Displays a small amount of information about the selected satellite
export default function InfoCard() {
    const selectedSatellite = useSelector((state: RootState) => state.satellite) as Satellite;



    return (
        <div className='card card-sm max-w-80 absolute bottom-10 bg-base-100 p-2 z-10 sm:left-10 '>
            <div className="card-body">
                <h2 className="card-title">{selectedSatellite.object_name != null ? selectedSatellite.object_name : 'Select a Satellite'}</h2>
                
                <p>
                    <span className="font-semibold opacity-60 mr-1">Category:</span> {selectedSatellite.category ?? 'N/A'}
                </p>
                <p>
                    <span className="font-semibold opacity-60 mr-1">Classification:</span> {selectedSatellite.classification_type ?? 'N/A'}
                </p>
                <p>
                    <span className="font-semibold opacity-60 mr-1">NORAD ID:</span> {selectedSatellite.norad_cat_id ?? 'N/A'}
                </p>
                <p>
                    <span className="font-semibold opacity-60 mr-1">Coordinates:</span> 
                    {selectedSatellite.coordinates ? `(${selectedSatellite.coordinates.map((coord: number) => coord.toFixed(3)).join(', ')})` : 'N/A'}
                </p>
            </div>
        </div>
    )

}