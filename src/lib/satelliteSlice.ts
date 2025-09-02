import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { object_name: null, coordinates: null },
    reducers: {
        setSelectedSatellite: (
            state: { object_name: string | null; coordinates: [number, number, number] | null },
            action: { payload: { object_name: string; satPos: [number, number, number]  } }
        ) => {
            console.log(action.payload)
            state.object_name = action.payload.object_name;
            state.coordinates = action.payload.satPos;
        },
        clearSelectedSatellite: (state) => {
            state.object_name = null;
            state.coordinates = null;
        }
    }
})

export const { setSelectedSatellite, clearSelectedSatellite } = satelliteSlice.actions;
export default satelliteSlice.reducer;