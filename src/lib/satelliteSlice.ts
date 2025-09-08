import { createSlice } from '@reduxjs/toolkit';

type SatelliteState = {
    object_name: string | null;
    coordinates: [number, number, number] | null;
    classification_type?: string | null;
    norad_cat_id?: number | null;
    category?: string | null;
    tle_line1?: string | null;
    tle_line2?: string | null;
}

type SetSelectedSatelliteAction = {
    payload: {
        object_name: string;
        satPos: [number, number, number];
        classification_type?: string | null;
        norad_cat_id?: number | null;
        category?: string | null;
        tle_line1?: string | null;
        tle_line2?: string | null;
    }
}

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { 
            object_name: null, 
            coordinates: null, 
            classification_type: null, 
            norad_cat_id: null, 
            category: null,
            tle_line1: null,
            tle_line2: null
        },
    reducers: {
        setSelectedSatellite: (
            state: SatelliteState,
            action: SetSelectedSatelliteAction
        ) => {
            state.tle_line1 = action.payload.tle_line1 || null;
            state.tle_line2 = action.payload.tle_line2 || null;
            state.object_name = action.payload.object_name;
            state.coordinates = action.payload.satPos;
            state.classification_type = action.payload.classification_type || null;
            state.norad_cat_id = action.payload.norad_cat_id || null;
            state.category = action.payload.category || null;
        },
        clearSelectedSatellite: (state) => {
            state.object_name = null;
            state.coordinates = null;
            state.classification_type = null;
            state.norad_cat_id = null;
            state.category = null;
        }
    }
})

export const { setSelectedSatellite, clearSelectedSatellite } = satelliteSlice.actions;
export default satelliteSlice.reducer;