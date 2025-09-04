import { createSlice } from '@reduxjs/toolkit';


const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState: { isDetailsOpen: false },
    reducers: {
        toggleDetails: (state) => {
            state.isDetailsOpen = !state.isDetailsOpen;
        },
    },
});

export const { toggleDetails } = toolbarSlice.actions;
export default toolbarSlice.reducer;
