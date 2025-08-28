import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { selectedId: null },
    reducers: {
       setSelectedSatelliteId: (state, action) => {
        console.log('Selected Satellite ID:', action.payload);
            state.selectedId = action.payload
       } 
    }
})

export const { setSelectedSatelliteId } = satelliteSlice.actions;
export default satelliteSlice.reducer;