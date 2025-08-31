import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { selectedId: null },
    reducers: {
       setSelectedSatellite: (state, action) => {
            state.selectedId = action.payload
       } 
    }
})

export const { setSelectedSatellite } = satelliteSlice.actions;
export default satelliteSlice.reducer;