import { createSlice } from '@reduxjs/toolkit';

const satelliteSlice = createSlice({
    name: 'satellite',
    initialState: { selectedId: null },
    reducers: {
       setSelectedId: (state, action) => {
            state.selectedId = action.payload
       } 
    }
})

export const { setSelectedId } = satelliteSlice.actions;
export default satelliteSlice.reducer;