import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { object_name: null, coordinates: [0, 0, 0] },
    reducers: {
        setSelectedSatellite: (
            state: { object_name: string | null; coordinates: number[] },
            action: { payload: { object_name: string; satPos: [number, number, number] } }
        ) => {
            console.log(action.payload)
            state.object_name = action.payload.object_name;
            state.coordinates = action.payload.satPos;
        },
        clearSelectedSatellite: (state) => {
            state.object_name = null;
            state.coordinates = [0, 0, 0];
        }
    }
})

export const { setSelectedSatellite, clearSelectedSatellite } = satelliteSlice.actions;
export default satelliteSlice.reducer;