import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { selectedId: null },
    reducers: {
        setSelectedSatellite: (state, action) => {
            state.selectedId = action.payload
        },
        clearSelectedSatellite: (state) => {
            state.selectedId = null;
        }
    }
})

export const { setSelectedSatellite, clearSelectedSatellite } = satelliteSlice.actions;
export default satelliteSlice.reducer;